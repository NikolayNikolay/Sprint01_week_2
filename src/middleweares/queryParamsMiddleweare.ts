
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { queryBlogRepository } from "../endPoints/blogs/repository/blogQyeryRepository";
import { validationResult } from "express-validator"

export const blogPostsUriParamsId = async (req:Request,res:Response,next:NextFunction)=>{
   const fuondBlog = await queryBlogRepository.getById(new ObjectId(req.body.blogId))
   if (!fuondBlog) {
      const errors = validationResult(req)
      
   }
   next()
}