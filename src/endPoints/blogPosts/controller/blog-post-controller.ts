import { blogPostsService } from "../domain/blogsPostsService"
import { Request,Response } from "express"
import { httpStatusCodes } from "../../../settings"
import { blogPostsQueryRepository } from "../repository/blog-post-QueryRepository"
import { ObjectId } from "mongodb"



export const blogPostsController= {
   async getAllPostsForBlog(req:Request | any  ,res:Response){
      const paginationsPostResult = await blogPostsQueryRepository.getAllPostsForBlog(req.params.id,req.query)
      
      if (paginationsPostResult === false) {
         res.send(httpStatusCodes.NOT_FOUND_404)
         return
      }
      res.status(httpStatusCodes.OK_200).send(paginationsPostResult)
   },
   async createPostForBlog(req:Request,res:Response){
      const createdPost = await blogPostsService.createPostForBlog(req.body, req.params.id)
      if(!createdPost){
         res.send(httpStatusCodes.NOT_FOUND_404)
         return
      }
      const getCreatedPost = await blogPostsQueryRepository.getPostforBlog(new ObjectId(createdPost))
      res.status(httpStatusCodes.CREATED_201).send(getCreatedPost)
   },
}