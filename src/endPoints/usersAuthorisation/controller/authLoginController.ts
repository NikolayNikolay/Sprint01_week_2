import { Request , Response } from "express";
import { httpStatusCodes } from "../../../settings";
import { authUserService } from "../domain/authLoginServise";
import { ResultStatus } from "../../../enums/resultStatus";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { jwtServise } from "../applications/jwtServises";




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
         res.status(httpStatusCodes.UNAUTHORIZED_401)
         return
      }
      res.status(httpStatusCodes.OK_200).send(req.user)
   }
}
