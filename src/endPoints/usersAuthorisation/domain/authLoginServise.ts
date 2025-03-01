import { LoginInputModelType } from "../../usersAuthorisation/models/LoginInputModel";
import { usersService } from "../../users/domain/usersService";
import { usersRepository } from "../../users/repository/usersRepository";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import { UserInputModel } from "../../users/models/UserInputModel";
import { ObjectId } from "mongodb";
import { emailServise } from "../emailDomain/emailServise";
import { randomUUID} from "crypto";
import { add} from "date-fns/add";
import { RegistrationConfirmationCodeModel } from "../models/RegistrationConfirmationCodeModel";
import { isBefore } from "date-fns/isBefore";
import { RegistrationEmail } from "../models/RegistrationEmailResendingModel";
import { jwtServise } from "../applications/jwtServises";
import { LoginSuccessViewModel } from "../models/LoginSuccessViewModel";
import { DeviceDbModel } from "../../securityDevices/models/DeviceViewModel";
import { PasswordRecoveryDbModel, UserDbModel } from "../../users/models/UserDbModel";
import { NewPasswordRecoveryInputModel } from "../models/NewPasswordRecoveryInputModel";


class AuthUserService{
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
         deviceId:randomUUID(),
         user_id: user._id.toString(),
      }
      const tokens = jwtServise.generateJwtTokens(user,sessionData)
      const decodedAndTakeIssueAtandExp = jwtServise.decodingJwt(tokens.refreshToken)
      sessionData = {...decodedAndTakeIssueAtandExp}// decoded data has what need to add in sessionDevice
      
      const addSessionData = await usersRepository.pushOrAddSomeDataValueUser({'_id': new ObjectId(user._id)},'sessionDevice',sessionData)
      
      return resultResponsObject(ResultStatus.Success,'Success',tokens)
   }
   //
   async registerUser(regisData:UserInputModel):Promise<ResponseObjectType>{
      const unickEmail = await usersRepository.findUserByEmailOrLogin(regisData.email)
      
      if (unickEmail) return resultResponsObject(ResultStatus.BadRequest,'Bad request',null,{ errorsMessages: [{ message: 'Existed Email', field: 'email' }] })

      const unickLogin = await usersRepository.findUserByEmailOrLogin(regisData.login)

      if (unickLogin) return resultResponsObject(ResultStatus.BadRequest,'Bad request',null,{ errorsMessages: [{ message: 'Existed Login', field: 'login' }] })

      const newUser:Omit<UserDbModel, '_id'> = {
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
        sessionDevice:[],
        passwordRecovery:[]
      }
      
      const createUserId = await usersRepository.create(newUser)
      if (!createUserId) {
         //500 err
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request')
      }
      // if user created and is found, will send email confirmation.
      try {
         
        emailServise.sendEmailForRegistration(regisData.email,newUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
   async confirmationUser(uuIdCode:RegistrationConfirmationCodeModel){
      if (!uuIdCode.code) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Not code in body", field: "code" }] })
      }
      const getUserByConfirmCode = await usersRepository.findUserWithAnyInformation({'emailConfirmation.confirmationCode' : uuIdCode.code})
      
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
      
      if (!checkExpirationDate) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request',null, { errorsMessages: [{ message: "Expired", field: "code" }] })
      }
      // update confirm field
      const updateConfirmation = await usersRepository.updateSomeDataValueUser({'_id': new ObjectId(getUserByConfirmCode._id) },'emailConfirmation.isConfirmed', true)
      

      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content',)
   }
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
      try {
         emailServise.sendEmailForRegistration(userEmail.email,getUser.emailConfirmation.confirmationCode)
      } catch (err) {
         console.error(err);
      }
 
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
   async userRefreshToken(user: DeviceDbModel, deviceName:string, ipAddres:string):Promise<ResponseObjectType<LoginSuccessViewModel | null>>{
      const checkUser = await usersRepository.findUserById(new ObjectId(user.user_id))
      if (!checkUser) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid id', field: 'id' }] })
      }
      
      // check iat from token in user field sessionDevice
      const isValidToken:DeviceDbModel | undefined = checkUser.sessionDevice.find((session:DeviceDbModel) => session.iat === user.iat && session.deviceId === user.deviceId)
      if (!isValidToken) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
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
      
      
      if (!renewToken) {
         return resultResponsObject(ResultStatus.ServerError,'500',null,{ errorsMessages: [{ message: 'some server error', field: 'token' }] })
      }
      return resultResponsObject(ResultStatus.Success,'Success',newPaerTokens)
   }
   async userLogOut(userSessionDevice:DeviceDbModel):Promise<ResponseObjectType>{
      const checkUser = await usersRepository.findUserById(new ObjectId(userSessionDevice.user_id))
      if (!checkUser) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid id', field: 'id' }] })
      }
      const isValidToken:DeviceDbModel | undefined = checkUser.sessionDevice.find((session:DeviceDbModel) => session.iat === userSessionDevice.iat && session.deviceId === userSessionDevice.deviceId)
      if (!isValidToken) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const removeSession = await usersRepository.removeSomeData({'_id': new ObjectId(checkUser._id) },{sessionDevice:{deviceId:userSessionDevice.deviceId}})
      const checkUser2 = await usersRepository.findUserById(new ObjectId(userSessionDevice.user_id))
      
      if (!removeSession) {
         return resultResponsObject(ResultStatus.ServerError,'500',null,{ errorsMessages: [{ message: 'some server error', field: 'token' }] })
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
   async passwordRecovery(userEmail:string){
      const user = await usersRepository.findUserByEmailOrLogin(userEmail)
      const recoveryPassword :PasswordRecoveryDbModel = {
         recoveryCode: randomUUID(),
         expirationDate: add(new Date(), {
            // hours: 1,
            minutes: 30,
         }),
         isConfirmed: false
      }
      const addRecoverCodeResult = await usersRepository.pushOrAddSomeDataValueUser({'email':userEmail},'passwordRecovery',recoveryPassword)
      console.log('passwordRecovery      ',addRecoverCodeResult);
      try {
         emailServise.sendEmailForRegistration(userEmail,recoveryPassword.recoveryCode)
       } catch (err) {
         console.error(err);
       }
       return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content')
   }
   async newPassword(confirmData:NewPasswordRecoveryInputModel){
      const user = await usersRepository.findUserWithAnyInformation({'recoveryCode':confirmData.recoveryCode})
      if (!user) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found',null,{ errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] })
      }
      const checkRecoveryCode = user.passwordRecovery.find((code:PasswordRecoveryDbModel) => code.recoveryCode === confirmData.recoveryCode)
      if (!checkRecoveryCode?.isConfirmed) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found',null,{ errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] })
      }
      const checkExpirationDate = isBefore(checkRecoveryCode.expirationDate, new Date())
      if (checkExpirationDate) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found',null,{ errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] })
      }

      const createNewPassword = await usersService._createHashPassword(confirmData.newPassword)

      const updateInfoAboutCode = await usersRepository.updateSomeDataValueUser({'_id':user._id}, 'password', createNewPassword)
      console.log('create new password   ',user, updateInfoAboutCode);
      const updateConfirmRecoverCode = await usersRepository.updateSomeObjInArray({'_id':user._id, 'passwordRecovery.recoveryCode':confirmData.recoveryCode}, true )
      console.log('after updateConfirmRecoverCode     ', updateConfirmRecoverCode);
      if (!updateInfoAboutCode || !updateConfirmRecoverCode) {
         //todo: finich logic update new password
         return resultResponsObject(ResultStatus.ServerError,'Server Error',null,{ errorsMessages: [{ message: 'some error with server', field: 'server' }] })
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'Success No Content',null)
      
   }
}

export const authUserService = new AuthUserService()