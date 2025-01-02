import { blogPostsService } from "../../domain/blogsPostsService"
import { Request,Response } from "express"
import { httpStatusCodes } from "../../settings"



export const blogPostsController= {
   async getAllPostsForBlog(req:Request | any  ,res:Response){
      const paginationsPostResult = await blogPostsService.getAllPostsForBlog(req.params.id,req.query)
      if (!paginationsPostResult.items) {
         res.send(httpStatusCodes.NOT_FOUND)
         return
      }
      res.status(httpStatusCodes.OK).send(paginationsPostResult)
   }
}