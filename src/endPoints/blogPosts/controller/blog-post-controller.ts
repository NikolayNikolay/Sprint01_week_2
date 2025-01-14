import { blogPostsService } from "../domain/blogsPostsService"
import { Request,Response } from "express"
import { httpStatusCodes } from "../../../settings"
import { blogPostsQueryRepository } from "../repository/blog-post-QueryRepository"
import { ObjectId } from "mongodb"



export const blogPostsController= {
   async getAllPostsForBlog(req:Request | any  ,res:Response){
      const paginationsPostResult = await blogPostsQueryRepository.getAllPostsForBlog(req.params.id,req.query)
      res.status(httpStatusCodes.OK).send(paginationsPostResult)
   },
   async createPostForBlog(req:Request,res:Response){
      const createdPost = await blogPostsService.createPostForBlog(req.body, req.params.id)
      if(!createdPost){
         res.send(httpStatusCodes.BAD_REQUEST)
         return
      }
      const getCreatedPost = await blogPostsQueryRepository.getPostforBlog(new ObjectId(createdPost))
      res.status(httpStatusCodes.CREATED).send(getCreatedPost)
   },
}