import { NextFunction, Response, Request } from "express";
import { jwtServise } from "../applications/jwtServises";
import { ResultStatus } from "../../../enums/resultStatus";
import { error } from "console";
import { httpStatusCodes, SETTINGS } from "../../../settings";




export const authenticateUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
   try {
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) {
       req.user = null;
       return res.send(httpStatusCodes.UNAUTHORIZED_401);
     }
     // Decode the token
     const decoded = await jwtServise.checkJwtTokenUser(token);
      req.user = { id: decoded.userId, name: decoded.name, email: decoded.email }; // Populate `req.user`
     next();
     return
   } 
   catch (error) {
     req.user = null;
     res.send(httpStatusCodes.UNAUTHORIZED_401);
     return
   }
}
