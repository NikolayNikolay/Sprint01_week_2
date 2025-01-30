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
      const user = await usersRepository.findUserByEmailOrLogin(authData.loginOrEmail,authData.loginOrEmail)
      if (!user) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{message: 'invalid Password or Email',
            field	: 'Password or Email'})
      }
      const checkPssword = await usersService._comparePassword(authData.password, user.password)
      if (!checkPssword) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{message: 'invalid Password or Email',
            field	: 'Password or Email'})
      }
      return resultResponsObject(ResultStatus.Success,'Success',user)
   },
   //
   async registerUser(regisData:UserInputModel):Promise<ResponseObjectType>{
      const user = await usersRepository.findUserByEmailOrLogin(regisData.email,regisData.login)
      
      if (user) return resultResponsObject(ResultStatus.BadRequest,'Bad request',null,{
         "message": "Existed Email or Login",
         "field": "email or login"
        })
      const newUser = {
         ...regisData,
         password: await usersService._createHashPassword(regisData.password),
         createdAt: new Date().toISOString(),
         emailConfirmation: {
            confirmationCode: randomUUID(),
            expirationDate: add(new Date(), {
               // hours: 1,
               minutes: 1,
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
         await emailServise.sendEmail(regisData.email,newUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   },
   async confirmationUser(uuIdCode:RegistrationConfirmationCodeModel){
      if (!uuIdCode.code) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "Not found",
            "field": "code"
          })
      }
      const getUserByConfirmCode = await usersRepository.findUserWithEmailConfirmation({'emailConfirmation.confirmationCode' : uuIdCode.code})
      
      // check is valid uuId 
      if (!getUserByConfirmCode) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "Not found",
            "field": "code"
          })
      }
      
      //check is alredy confirmed
      if (getUserByConfirmCode!.emailConfirmation!.isConfirmed) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "Already been confirmed",
            "field": "code"
          })
      }
      // check experation date, must be last in the list
      const checkExpirationDate = isBefore(getUserByConfirmCode!.emailConfirmation!.expirationDate, new Date())
      
      if (checkExpirationDate) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "Expired",
            "field": "code"
         })
      }
      // update confirm field
      const updateConfirmation = await usersRepository.updateSomeDataValueUser({'_id': new ObjectId(getUserByConfirmCode._id) },'emailConfirmation.isConfirmed', true)


      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content',)

   },
   async emailResendingForConfirmation(UserEmail:RegistrationEmail):Promise<ResponseObjectType>{
      const getUser = await usersRepository.findUserByEmailOrLogin(UserEmail.email)
      console.log(getUser?.email === UserEmail.email);
      
      if (!getUser) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "Not found",
            "field": "email"
          })
      }

      if (getUser.emailConfirmation.isConfirmed) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "alredy confirmed",
            "field": "email"
          })
      }
      const confirmationCode = randomUUID()
      const renewConfirmCodeInUser = await usersRepository.updateSomeDataValueUser({'_id': getUser._id }, 'emailConfirmation.confirmationCode',  confirmationCode )
      console.log(renewConfirmCodeInUser, getUser);
      
      try {
         await emailServise.sendEmail(UserEmail.email,confirmationCode)
      } catch (err) {
         console.error(err);
      }
      console.log(renewConfirmCodeInUser!.emailConfirmation!.confirmationCode === getUser.emailConfirmation.confirmationCode);
      
      if (renewConfirmCodeInUser!.emailConfirmation!.confirmationCode === getUser.emailConfirmation.confirmationCode) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, {
            "message": "some wrong with code",
            "field": "confirm code"
          })
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
}