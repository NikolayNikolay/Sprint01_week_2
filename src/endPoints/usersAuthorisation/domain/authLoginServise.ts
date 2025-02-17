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
import { jwtServise } from "../applications/jwtServises";
import { LoginSuccessViewModel } from "../models/LoginSuccessViewModel";
import { DeviceDbModel } from "../../securityDevices/models/DeviceViewModel";
import { error } from "console";

export const authUserService = {
   async authorizationCheck(authData:LoginInputModelType,ip:string,device_name:string):Promise<ResponseObjectType<LoginSuccessViewModel | null>>{
      const user = await usersRepository.findUserByEmailOrLogin(authData.loginOrEmail)
      if (!user) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] })
      }

      const checkPssword = await usersService._comparePassword(authData.password, user.password)
      if (!checkPssword) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] })
      }
      if (!user.emailConfirmation.isConfirmed) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'Email not confirmed', field: 'emailConfirmati' }] })
      }
      // add logic session users with diferent units
      let sessionData: any = {
         ip,
         device_name,
         device_id:randomUUID(),
         user_id: user._id.toString(),
      }
      const tokens = jwtServise.generateJwtTokens(user,sessionData)
      const decodedAndTakeIssueAtandExp = jwtServise.decodingJwt(tokens.refreshToken)
      sessionData = {...decodedAndTakeIssueAtandExp}// decoded data has what need to add in sessionDevice
      console.log(sessionData);
      // todo: add repository and puch ssesionData in field sessionDevice
      const addSessionData = await usersRepository.pushOrAddSomeDataValueUser({'_id': new ObjectId(user._id)},'sessionDevice',sessionData)
      console.log(addSessionData);
      return resultResponsObject(ResultStatus.Success,'Success',tokens)
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
        },
        sessionDevice:[]
      }
      
      const createUserId = await usersRepository.create(newUser)
      if (!createUserId) {
         //500 err
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request')
      }
      // if user created and is found, will send email confirmation.
      try {
         console.log('send email for confirm');
         
        await emailServise.sendEmail(regisData.email,newUser.emailConfirmation.confirmationCode)
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
         // const confirmationCode = randomUUID()
         // const renewConfirmCodeInUser = await usersRepository.updateSomeDataValueUser({'_id': getUser._id }, 'emailConfirmation.confirmationCode',  confirmationCode )
         // console.log(`resend email ${confirmationCode} - ${renewConfirmCodeInUser?.emailConfirmation?.confirmationCode} - ${getUser.emailConfirmation.confirmationCode}`);
         // try {
         //    console.log('call emailsender');
            
         //    await emailServise.sendEmail(getUser.email,confirmationCode)
         // } catch (err) {
         //    console.error(err);
         // }
         // return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
      try {
         console.log('resend email' + userEmail.email);
         
         await emailServise.sendEmail(userEmail.email,getUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
      // if (renewConfirmCodeInUser!.emailConfirmation!.confirmationCode === getUser.emailConfirmation.confirmationCode) {
      //    return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null,{ errorsMessages: [{ message: "some wrong with code", field: "confirm code" }] })
      // }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   },
   async userRefreshToken(user: DeviceDbModel, deviceName:string, ipAddres:string):Promise<ResponseObjectType<LoginSuccessViewModel | null>>{
      const checkUser = await usersRepository.findUserById(new ObjectId(user.user_id))
      if (!checkUser) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid id', field: 'id' }] })
      }
      // check iat from token in user field sessionDevice
      const isValidToken:DeviceDbModel | undefined = checkUser.sessionDevice.find((session:DeviceDbModel) => session.iat === user.iat && session.device_id === user.device_id)
      console.log('servise to check iat   ',isValidToken, user, deviceName);
      if (!isValidToken) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      console.log(isValidToken.device_name === deviceName);
      if (isValidToken.device_name.toLowerCase() !== deviceName.toLowerCase()) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'unknown device', field: 'device' }] })
      }
      if (isValidToken.ip.toLowerCase() !== ipAddres.toLowerCase()) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'unknown ip', field: 'ip' }] })
      }

      const newPaerTokens = jwtServise.generateJwtTokens(checkUser, isValidToken)
      
      if (!newPaerTokens.accessToken && !newPaerTokens.refreshToken) {
         return resultResponsObject(ResultStatus.ServerError,'500',null,{ errorsMessages: [{ message: 'can not create', field: 'token' }] })
      }
      // after created new tokens decod refresh and update session iat and exp
      const decodedSessionData = jwtServise.decodingJwt(newPaerTokens.refreshToken)
      if (!decodedSessionData) {
        throw new Error('decode is null')
      }
      const renewToken = await usersRepository.updateSessionDeviceInformation({'_id': new ObjectId(user.user_id) },decodedSessionData)
      console.log('renew refrech token   ',isValidToken, renewToken );
      
      if (!renewToken) {
         return resultResponsObject(ResultStatus.ServerError,'500',null,{ errorsMessages: [{ message: 'some server error', field: 'token' }] })
      }
      return resultResponsObject(ResultStatus.Success,'Success',newPaerTokens)
   },
   async userLogOut(userId: string, sessionDeviceId:string):Promise<ResponseObjectType>{
      const checkUser = await usersRepository.findUserById(new ObjectId(userId))
      if (!checkUser) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid id', field: 'id' }] })
      }
      const isValidToken:DeviceDbModel | undefined = checkUser.sessionDevice.find((session:DeviceDbModel) => session.device_id === sessionDeviceId)
      if (!isValidToken) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const removeSession = await usersRepository.removeSomeData({'_id': new ObjectId(checkUser._id) },{sessionDevice:{device_id:sessionDeviceId}})
      const checkUser2 = await usersRepository.findUserById(new ObjectId(userId))
      console.log(checkUser2);
      
      if (!removeSession) {
         return resultResponsObject(ResultStatus.ServerError,'500',null,{ errorsMessages: [{ message: 'some server error', field: 'token' }] })
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
}