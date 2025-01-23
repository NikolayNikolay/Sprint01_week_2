import { Request, Response } from "express"
import { httpStatusCodes } from "../../../settings"
import { postsService } from "../domain/postsService"
import { postQueryRepository } from "../repository/queryPostRepository"
import { ObjectId } from "mongodb"

export const postsController ={
   async createPost (req:Request , res:Response){
      const createdPostId = await postsService.create(req.body)
      console.log(createdPostId );
      if (!createdPostId ) {
         res.sendStatus(httpStatusCodes.NOT_FOUND_404)
         return
      }
      const getCreatedPost = await postQueryRepository.getById(new ObjectId(createdPostId))
      res.status(httpStatusCodes.CREATED_201).send(getCreatedPost)
   },
   async getAllPosts (req:Request | any, res:Response){
      const allPosts = await  postQueryRepository.getAll(req.query)
      res.status(httpStatusCodes.OK_200).send(allPosts)
   },
   async getPostById (req:Request , res:Response){
      const fuondPost = await postQueryRepository.getById(new ObjectId(req.params.id))
      if (!fuondPost) {
         res.send(httpStatusCodes.NOT_FOUND_404)
      }
      else{
      res.status(httpStatusCodes.OK_200).send(fuondPost)
      }
   },
   async updatePostById (req:Request , res:Response){
      const updetedPost = await postsService.update(req.body , req.params.id)
      if (!updetedPost) {
         res.send(httpStatusCodes.NOT_FOUND_404)
      }
      else{
      res.send(httpStatusCodes.NO_CONTENT_204)
      }
   },
   async deletPostById (req:Request , res:Response){
      const deletedPost = await postsService.deleteById(req.params.id)
      if (!deletedPost) {
         res.send(httpStatusCodes.NOT_FOUND_404)
      }
      else{
            res.send(httpStatusCodes.NO_CONTENT_204)
         }
   }

}