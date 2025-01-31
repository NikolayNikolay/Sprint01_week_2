import { Request , Response } from "express";
import { httpStatusCodes } from "../../../settings";
import { authUserService } from "../domain/authLoginServise";
import { ResultStatus } from "../../../enums/resultStatus";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { jwtServise } from "../applications/jwtServises";
import { usersService } from "../../users/domain/usersService";
import { usersRepository } from "../../users/repository/usersRepository";
import { ObjectId } from "mongodb";




export const authLoginController = {
   async authLoginPost(req:Request, res:Response){
      const authUser = await authUserService.authorizationCheck(req.body)
      if (authUser.status === ResultStatus.Unathorized) {
         res.sendStatus(resultStatusToHttpStatusCode(authUser.status))
         return
      }
      const token = await jwtServise.generateJwtToken(authUser.data!)
      res.status(resultStatusToHttpStatusCode(authUser.status)).send(token)
   },
   async getInformationOfMe(req:Request, res:Response){
      if (!req.user) {
         res.send(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      res.status(httpStatusCodes.OK_200).send(req.user)
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
      res.send( resultStatusToHttpStatusCode(resendingEmailResult.status))
   }
}
