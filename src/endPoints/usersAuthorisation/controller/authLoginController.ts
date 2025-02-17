import { Request , Response } from "express";
import { httpStatusCodes, SETTINGS } from "../../../settings";
import { authUserService } from "../domain/authLoginServise";
import { ResultStatus } from "../../../enums/resultStatus";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { jwtServise } from "../applications/jwtServises";
import { usersService } from "../../users/domain/usersService";
import { usersRepository } from "../../users/repository/usersRepository";
import { ObjectId } from "mongodb";
import { queryUsersRepository } from "../../users/queryRepository/queryUsersRepository";
const delay = (ms:number)=>new Promise(resolve=>setTimeout(resolve, ms))



export const authLoginController = {
   async authLoginPost(req:Request, res:Response){
      const ipUser = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress
      const deviceName = req.headers['user-agent']
      console.log(ipUser,deviceName);
      
      const authUser = await authUserService.authorizationCheck(req.body,ipUser!.toString(), deviceName!)
      if (authUser.status === ResultStatus.Unathorized) {
         res.sendStatus(resultStatusToHttpStatusCode(authUser.status))
         return
      }
      res.cookie('refreshToken', authUser.data?.refreshToken, {httpOnly: true, secure: true,})
      res.status(resultStatusToHttpStatusCode(authUser.status)).send({accessToken:authUser.data?.accessToken})
   },
   async getInformationOfMe(req:Request, res:Response){
      if (!req.user) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      const infoUser = await queryUsersRepository.getInformationOfMe(new ObjectId(req.user.user_id))
      if (!infoUser) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      res.status(httpStatusCodes.OK_200).send(infoUser)
   },
   async rigistrationUser(req:Request, res:Response){
      const resultRegistration = await authUserService.registerUser(req.body)
      if (resultRegistration.errors?.errorsMessages.length) {
         res.status(resultStatusToHttpStatusCode(resultRegistration.status)).send(resultRegistration.errors)
         return
      }
      res.send(resultStatusToHttpStatusCode(resultRegistration.status))
   },
   async registrationConfirmation(req:Request, res:Response){
      const confirmationResult = await authUserService.confirmationUser(req.body)
      if (confirmationResult.errors?.errorsMessages.length) {
         res.status(resultStatusToHttpStatusCode(confirmationResult.status)).send(confirmationResult.errors)
         return
      }
      res.send(resultStatusToHttpStatusCode(confirmationResult.status))
   },
   async resendingEmailForConfirmation(req:Request, res:Response){
      const resendingEmailResult = await authUserService.emailResendingForConfirmation(req.body)
      if (resendingEmailResult.errors?.errorsMessages.length) {
         res.status(resultStatusToHttpStatusCode(resendingEmailResult.status)).send(resendingEmailResult.errors)
         return
      }
      res.sendStatus( resultStatusToHttpStatusCode(resendingEmailResult.status))
   },
   async userRefreshToken(req:Request, res:Response){
      const deviceName = req.headers['user-agent']
      const ipUser = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress
      if (!req.user) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      const refreshResult = await authUserService.userRefreshToken(req.user,deviceName!,ipUser as string)
      if (!refreshResult) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      
      res.cookie('refreshToken', refreshResult.data?.refreshToken, {httpOnly: true, secure: true,})
      res.status(resultStatusToHttpStatusCode(refreshResult.status)).send({accessToken: refreshResult.data?.accessToken})
   },
   async userLogOut(req:Request, res:Response){
      if (!req.user) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      const userLogOutResult = await authUserService.userLogOut(req.user.user_id, req.user.device_id)
      res.clearCookie('refreshToken')
      res.sendStatus(resultStatusToHttpStatusCode(userLogOutResult.status))
   }
}
