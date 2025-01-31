import { errorsMessagesType } from "../types/errorsMessagesType"
import { ResponseObjectType } from "../types/ResponseObjectType"



export const resultResponsObject = (statusCode:string , errMessage:any, data?:any , errArray?:errorsMessagesType ):ResponseObjectType =>{
   return {
      status: statusCode,
      message: errMessage,
      data: data ? data : null,
      errors: errArray
   }
}