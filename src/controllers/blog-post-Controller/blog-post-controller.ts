import { blogPostsService } from "../../domain/blogsPostsService"
import { Request,Response } from "express"
import { httpStatusCodes } from "../../settings"



export const blogPostsController= {
   async getAllPostsForBlog(req:Request | any  ,res:Response){
      const paginationsPostResult = await blogPostsService.getAllPostsForBlog(req.params.id,req.query)
      res.status(httpStatusCodes.OK).send(paginationsPostResult)
   }
}