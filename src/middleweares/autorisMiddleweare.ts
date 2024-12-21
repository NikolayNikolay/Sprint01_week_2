import { ADMIN_AUTH, httpStatusCodes } from "../settings";
import { Request, Response, NextFunction } from "express";



export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
   const autoris = req.headers['authorisation'] as string
   if (!autoris) {
      console.log(autoris)
      res.send(httpStatusCodes.UNAUTHORIZED)
      return
  }
  const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
  const codedAuth = buff2.toString('base64')

  // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
  if (!autoris.includes(codedAuth) || !autoris.includes('Basic ')) {
   res.send(httpStatusCodes.UNAUTHORIZED)
      return
  }
   next()
}
