import jwt, { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError } from "jsonwebtoken"
import { UserViewModelWith_id } from "../../users/models/UserViewModel"
import { SETTINGS } from "../../../settings"
import { LoginSuccessViewModel } from "../models/LoginSuccessViewModel"
import { resultResponsObject } from "../../../helpers/resultResponsObject"
import { ResultStatus } from "../../../enums/resultStatus"
import { UserDbModel } from "../../users/models/UserDbModel"
import {DeviceDbModel} from "../../securityDevices/models/DeviceViewModel"
import { log } from "console"

const convertSecretForJwt = Buffer.from(SETTINGS.SECRET_KEY as string).toString('base64')

type returnDecodedModel = {
   user_id: string, 
   iat:number,
   ip:string,
   device_name:string,
   deviceId: string,
   exp:number
}



export const jwtServise = {
   generateJwtTokens(user: UserDbModel, sessionData?:Omit<DeviceDbModel,'iat'|'exp'>):LoginSuccessViewModel {
      
      const jwtAccess = jwt.sign({ user_id: user._id.toString()}, convertSecretForJwt, { expiresIn: '10s' })

      const jwtRefresh = jwt.sign({ user_id: user._id.toString(), iat: Math.floor(Date.now() / 1000),ip:sessionData?.ip,
         device_name:sessionData?.device_name,
         deviceId:sessionData?.deviceId}, convertSecretForJwt, { expiresIn: '20s' })

      return {
         accessToken: jwtAccess,
         refreshToken: jwtRefresh
       }
   },
   checkJwtTokensUser(token:string):{user_id:string,iat: number,exp:number} | DeviceDbModel| null{
      try {
            const result = jwt.verify(token, convertSecretForJwt)
            if (!result || typeof result !== "object" || !result.user_id) {
               return null;
           }
            return {
               ip: result.ip ? result.ip : null,
               device_name: result.device_name ? result.device_name : null,
               deviceId: result.deviceId ? result.deviceId : null,
               user_id: result.user_id,
               iat: result.iat as number,
               exp: result.exp as number,
           };
      } catch (error) {
         console.log('checkJwt', error);
         throw error
      }
   },
   decodingJwt(token:string){
      const decoded = jwt.decode(token) as returnDecodedModel | null
      if (!decoded) return null; // Handle invalid tokens
      return decoded
   }
}