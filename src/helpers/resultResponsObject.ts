import { ResponseObjectType } from "../types/ResponseObjectType"



export const resultResponsObject = (statusCode:string , errMessage:any, data?:any , errArray?:any ) =>{
   return {
      status: statusCode,
      message: errMessage,
      data: data ? data : null,
      errors: errArray ? [errArray] : []
   }
}