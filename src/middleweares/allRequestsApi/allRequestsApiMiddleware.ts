import { Response,Request, NextFunction } from "express";
import {  RequestApiModel } from "../../types/AllRequestsAPI";
import { allRequestsApiCollection } from "../../db/mongo-db";




export const trackAllRequestsApi = async (req:Request, res:Response, next:NextFunction)=>{
   const ipUser = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress
   const someinfoUserFromRequest: RequestApiModel = {IP:ipUser!.toString(),
      URL:req.originalUrl,
      date: new Date()
   }
   try {
      const id = await allRequestsApiCollection.insertOne(someinfoUserFromRequest)
      const allUserRequestApi = await allRequestsApiCollection.find({IP:ipUser!.toString(),URL:req.originalUrl,date:{ $gt: new Date(Date.now() - 10 * 1000) }}).toArray()
      next()
   } catch (error) {
      console.error(error)
      next()
   }
   
}