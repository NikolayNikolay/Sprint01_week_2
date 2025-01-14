import { Request , Response } from "express";
import { usersCervice } from "../../users/domain/usersService";
import { httpStatusCodes } from "../../../settings";


export const authLoginController = {
   async authLoginPost(req:Request, res:Response){
      const auth = await usersCervice.authorizationCheck(req.body)
      if (!auth) {
         res.sendStatus(httpStatusCodes.UNAUTHORIZED)
         return
      }
      res.sendStatus(httpStatusCodes.NO_CONTENT)
   }
}
