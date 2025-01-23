import { ADMIN_AUTH, httpStatusCodes } from "../settings";
import { Request, Response, NextFunction } from "express";



export const authMiddleware = async (req:Request, res:Response, next:NextFunction)=>{
  console.log('inside Authorization');
 const authorizationHeader = req.headers['authorization'] as any;
    if (!authorizationHeader) {
        console.log('No Authorization header');
      res.send(httpStatusCodes.UNAUTHORIZED_401);
      return
    }
    
    if (!authorizationHeader.startsWith('Basic ')) {
        console.log('Authorization header is not Basic');
      res.send(httpStatusCodes.UNAUTHORIZED_401);
      return
    }

    const encodedAuth = authorizationHeader.slice(6); // Extract the base64 part
    const expectedAuth = Buffer.from(ADMIN_AUTH, 'utf8').toString('base64');

    if (encodedAuth !== expectedAuth) {
        console.log('Invalid credentials');
      res.send(httpStatusCodes.UNAUTHORIZED_401);
      return
    }

    next(); // Proceed to the next middleware or route handler
}
