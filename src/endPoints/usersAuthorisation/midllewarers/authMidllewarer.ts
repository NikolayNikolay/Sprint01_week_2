import { NextFunction, Response, Request } from "express";
import { jwtServise } from "../applications/jwtServises";
import { ResultStatus } from "../../../enums/resultStatus";
import { error } from "console";
import { httpStatusCodes, SETTINGS } from "../../../settings";




export const authenticateUser = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
   try {
     const accsessToken = req.headers.authorization?.split(' ')[1];
     if (!accsessToken) {
       req.user = null;
       return res.send(httpStatusCodes.UNAUTHORIZED_401);
     }
     // Decode the token
     const decodedTokens = jwtServise.checkJwtTokensUser(accsessToken);
      req.user = { user_id: decodedTokens?.user_id, ...decodedTokens}; // Populate `req.user`
     next();
     return
   } 
   catch (error) {
     req.user = null;
     res.send(httpStatusCodes.UNAUTHORIZED_401);
     return
   }
}

export const authRefreshToken = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  try {
    // console.log('inside midleware      ',req.headers.cookie);
    const  refreshToken = req.headers.cookie?.split('=')[1].split(";")[0]
    // console.log('inside midleware      ', refreshToken);
    if (!refreshToken) {
      req.user = null;
      return res.sendStatus(httpStatusCodes.UNAUTHORIZED_401);
    }
    // Decode the token
    const decodedTokens = jwtServise.checkJwtTokensUser(refreshToken);
    // console.log('decoded refrech token  ', decodedTokens);
    
    req.user = { user_id: decodedTokens?.user_id, ...decodedTokens}; // Populate `req.user`
    next();
    return
  } 
  catch (error) {
    console.log(error);
    
    req.user = null;
    res.sendStatus(httpStatusCodes.UNAUTHORIZED_401);
    return
  }
}