import { Response,Request, NextFunction } from "express";
import {  RequestApiModel } from "../../types/AllRequestsAPI";
import { allRequestsApiCollection } from "../../db/mongo-db";
import { httpStatusCodes } from "../../settings";




export const trackAllRequestsApi = async (req:Request, res:Response, next:NextFunction)=>{
   const ipUser = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress
   const someinfoUserFromRequest: RequestApiModel = {IP:ipUser!.toString(),
      URL:req.originalUrl,
      date: new Date()
   }
   // console.log(someinfoUserFromRequest.URL);
   
   try {
      
      const allUserRequestApi = await allRequestsApiCollection.find({IP:ipUser!.toString(),URL:req.originalUrl,date:{ $gt: new Date(Date.now() - 10 * 1000) }}).toArray()
      // console.log(allUserRequestApi.length);
      
      if (allUserRequestApi.length >= 5) {
         res.sendStatus(httpStatusCodes.Too_Many_Requests_429)
         return
      }
      const id = await allRequestsApiCollection.insertOne(someinfoUserFromRequest)
      next()
      
   } catch (error) {
      console.error(error)
      next()
   }
   
}