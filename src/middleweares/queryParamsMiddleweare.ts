
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../settings";
import { blogRepository } from "../repository/mongo-db-repository/blogsRepository";


export const blogPostsUriParamsId = async (req:Request,res:Response,next:NextFunction)=>{
   const fuondBlog = await blogRepository.getById(req.params.id)
   if (!fuondBlog) {
      res.sendStatus(httpStatusCodes.NOT_FOUND)
      return
   }
   next()
}