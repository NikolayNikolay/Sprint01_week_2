
import { Request, Response, NextFunction } from "express";
import { httpStatusCodes } from "../settings";
import { ObjectId } from "mongodb";
import { blogRepository } from "../endPoints/blogs/repository/blogsRepository";


export const blogPostsUriParamsId = async (req:Request,res:Response,next:NextFunction)=>{
   const fuondBlog = await blogRepository.getById(new ObjectId(req.params.id))
   if (!fuondBlog) {
      res.sendStatus(httpStatusCodes.NOT_FOUND)
      return
   }
   next()
}