import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"



export const inputCheckErrorsMiddleware = (req:Request, res:Response, next:NextFunction) => {
   console.log(validationResult(req))
   const e = validationResult(req)
   const errors = e.array({onlyFirstError:true})
   
   if (errors.length > 0) {
      res.status(400).send({ errorsMessages: errors.map((err:any)=>{return {message: err.msg, field:err.path}}) })
      return
   }
   next()
}