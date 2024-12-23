import { ADMIN_AUTH, httpStatusCodes } from "../settings";
import { Request, Response, NextFunction } from "express";



export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
  console.log('inside Authorization');
 const authorizationHeader = req.headers['authorization'] as any;
    if (!authorizationHeader) {
        console.log('No Authorization header');
      res.send(httpStatusCodes.UNAUTHORIZED);
    }

    if (!authorizationHeader.startsWith('Basic ')) {
        console.log('Authorization header is not Basic');
      res.send(httpStatusCodes.UNAUTHORIZED);
    }

    const encodedAuth = authorizationHeader.slice(6); // Extract the base64 part
    const expectedAuth = Buffer.from(ADMIN_AUTH, 'utf8').toString('base64');

    if (encodedAuth !== expectedAuth) {
        console.log('Invalid credentials');
      res.send(httpStatusCodes.UNAUTHORIZED);
    }

    next(); // Proceed to the next middleware or route handler

   
//    const autorisHeader = req.headers
//    const autoris = autorisHeader.authorization
//    if (!autoris) {
//       console.log(autoris)
//       res.send(httpStatusCodes.UNAUTHORIZED)
//       return
//   }
//   const buff2 = Buffer.from(ADMIN_AUTH, 'utf8')
//   const codedAuth = buff2.toString('base64')

//   // if (decodedAuth === ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
//   if (autoris.slice(6) !== codedAuth || autoris.slice(0, 5) !== 'Basic ') {
//    res.send(httpStatusCodes.UNAUTHORIZED)
//       return
//   }
}
