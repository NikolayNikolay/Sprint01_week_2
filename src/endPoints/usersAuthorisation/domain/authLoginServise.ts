import { LoginInputModelType } from "../../usersAuthorisation/models/LoginInputModel";
import { usersService } from "../../users/domain/usersService";
import { usersRepository } from "../../users/repository/usersRepository";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import {UserViewModelWith_id } from "../../users/models/UserViewModel";
import { UserInputModel } from "../../users/models/UserInputModel";
import { ObjectId } from "mongodb";
import { emailServise } from "../emailDomain/emailServise";
import { UserDBModelWithCongirmation } from "../models/UserRegistrationConfimationModel";
import { randomUUID} from "crypto";
import { add} from "date-fns/add";
import { RegistrationConfirmationCodeModel } from "../models/RegistrationConfirmationCodeModel";
import { isBefore } from "date-fns/isBefore";
import { RegistrationEmail } from "../models/RegistrationEmailResendingModel";

export const authUserService = {
   async authorizationCheck(authData:LoginInputModelType):Promise<ResponseObjectType<UserViewModelWith_id | null>>{
      const user = await usersRepository.findUserByEmailOrLogin(authData.loginOrEmail)
      if (!user) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] })
      }

      const checkPssword = await usersService._comparePassword(authData.password, user.password)
      if (!checkPssword) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] })
      }
      return resultResponsObject(ResultStatus.Success,'Success',user)
   },
   //
   async registerUser(regisData:UserInputModel):Promise<ResponseObjectType>{
      const unickEmail = await usersRepository.findUserByEmailOrLogin(regisData.email)
      
      if (unickEmail) return resultResponsObject(ResultStatus.BadRequest,'Bad request',null,{ errorsMessages: [{ message: 'Existed Email', field: 'email' }] })

      const unickLogin = await usersRepository.findUserByEmailOrLogin(regisData.login)

      if (unickLogin) return resultResponsObject(ResultStatus.BadRequest,'Bad request',null,{ errorsMessages: [{ message: 'Existed Login', field: 'login' }] })

      const newUser = {
         ...regisData,
         password: await usersService._createHashPassword(regisData.password),
         createdAt: new Date().toISOString(),
         emailConfirmation: {
            confirmationCode: randomUUID(),
            expirationDate: add(new Date(), {
               // hours: 1,
               minutes: 30,
            }),
            isConfirmed: false
        }
      }
      
      const createUserId = await usersRepository.create(newUser)
      if (!createUserId) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request')
      }
      // if user created and is found, will send email confirmation.
      try {
         emailServise.sendEmail(regisData.email,newUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   },
   async confirmationUser(uuIdCode:RegistrationConfirmationCodeModel){
      if (!uuIdCode.code) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Not code in body", field: "code" }] })
      }
      const getUserByConfirmCode = await usersRepository.findUserWithEmailConfirmation({'emailConfirmation.confirmationCode' : uuIdCode.code})
      
      // check is existing user by uuId 
      if (!getUserByConfirmCode) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Not found", field: "code" }] })
      }
      
      //check is alredy confirmed
      if (getUserByConfirmCode!.emailConfirmation!.isConfirmed) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "is alredy confirmed", field: "code" }] })
      }
      // check experation date, must be last in the list
      const checkExpirationDate = isBefore(getUserByConfirmCode!.emailConfirmation!.expirationDate, new Date())
      
      if (checkExpirationDate) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Expired", field: "code" }] })
      }
      // update confirm field
      const updateConfirmation = await usersRepository.updateSomeDataValueUser({'_id': new ObjectId(getUserByConfirmCode._id) },'emailConfirmation.isConfirmed', true)
      

      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content',)
   },
   async emailResendingForConfirmation(userEmail:RegistrationEmail):Promise<ResponseObjectType>{
      if (!userEmail.email) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Not email in body", field: "email" }] })
      }
      const getUser = await usersRepository.findUserByEmailOrLogin(userEmail.email)
      
      if (!getUser) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Not found user", field: "email" }] })
      }

      if (getUser.emailConfirmation.isConfirmed) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "alredy confirmed", field: "email" }] })
      }
      // if (!getUser.emailConfirmation.isConfirmed) {
      //    const confirmationCode = randomUUID()
      //    const renewConfirmCodeInUser = await usersRepository.updateSomeDataValueUser({'_id': getUser._id }, 'emailConfirmation.confirmationCode',  confirmationCode )
      //    try {
      //       await emailServise.sendEmail(getUser.email,confirmationCode)
      //    } catch (err) {
      //       console.error(err);
      //    }
      //    return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
      // }
      try {
         emailServise.sendEmail(getUser.email,getUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
      // if (renewConfirmCodeInUser!.emailConfirmation!.confirmationCode === getUser.emailConfirmation.confirmationCode) {
      //    return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null,{ errorsMessages: [{ message: "some wrong with code", field: "confirm code" }] })
      // }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
}