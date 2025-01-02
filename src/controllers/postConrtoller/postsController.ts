import { Request, Response } from "express"
import { httpStatusCodes } from "../../settings"
import { postsService } from "../../domain/postsService"

export const postsController ={
   async createPost (req:Request , res:Response){
      const createdPost = await postsService.create(req.body)
      if (!createdPost) {
         res.send(httpStatusCodes.BAD_REQUEST)
      }
      res.status(httpStatusCodes.CREATED).send(createdPost)
   },
   async getAllPosts (req:Request , res:Response){
      const allPosts = await  postsService.getAll()
      res.status(httpStatusCodes.OK).send(allPosts)
   },
   async getPostById (req:Request , res:Response){
      const fuondPost = await postsService.getById(req.params.id)
      if (!fuondPost) {
      console.log('getbyid1');
         res.send(httpStatusCodes.NOT_FOUND)
      }
      else{
      console.log('getbyid2');
      
      res.status(httpStatusCodes.OK).send(fuondPost)
      }
   },
   async updatePostById (req:Request , res:Response){
      const updetedPost = await postsService.update(req.body , req.params.id)
      if (!updetedPost) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      else{
      res.send(httpStatusCodes.NO_CONTENT)
      }
   },
   async deletPostById (req:Request , res:Response){
      const existed = await postsService.getById(req.params.id)
      if (!existed) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      else{
         const deletedPost = await postsService.deleteById(req.params.id)
         if (deletedPost) {
            res.send(httpStatusCodes.NO_CONTENT)
            return
         }
      }
   }

}