import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken"
import { UserViewModelWith_id } from "../../users/models/UserViewModel"
import { SETTINGS } from "../../../settings"
import { LoginSuccessViewModel } from "../models/LoginSuccessViewModel"
import { resultResponsObject } from "../../../helpers/resultResponsObject"
import { ResultStatus } from "../../../enums/resultStatus"



export const jwtServise = {
   async generateJwtToken(user: UserViewModelWith_id ):Promise<LoginSuccessViewModel> {
      const jwtToken = jwt.sign({ userId: user._id.toString(), email: user.email,
         name: user.login }, SETTINGS.SECRET_KEY as string, { expiresIn: '1h' })
      return {
         accessToken: jwtToken
       }
   },
   async checkJwtTokenUser(token:string):Promise<any>{
      try {
         const result = jwt.verify(token, SETTINGS.SECRET_KEY as string)
         return result
      } catch (error) {
         console.log(error);
         throw error
      }
   }
}