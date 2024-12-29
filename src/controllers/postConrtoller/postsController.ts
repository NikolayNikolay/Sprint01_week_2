import { Request, Response } from "express"
import { httpStatusCodes } from "../../settings"
import { PostViewModelType } from "../../types/PostViewModel"
import { PostInputModelType } from "../../types/PostInputModel"
// import { postRepository } from "../../repository/postRepository" // file database from folder db
import { DB } from "../../db/db"
import { postRepository } from "../../repository/mongo-db-repository/postRepository"  // local or cloud database from mongoDB
import { log } from "console"

export const postsController ={
   async createPost (req:Request , res:Response){
      const createdPost = await postRepository.create(req.body)
      res.status(httpStatusCodes.CREATED).send(createdPost)
   },
   async getAllPosts (req:Request , res:Response){
      const allPosts = await  postRepository.getAll()
      res.status(httpStatusCodes.OK).send(allPosts)
   },
   async getPostById (req:Request , res:Response){
      const fuondPost = await postRepository.getById(req.params.id)
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
      const updetedPost = await postRepository.update(req.body , req.params.id)
      if (!updetedPost) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      else{
      res.send(httpStatusCodes.NO_CONTENT)
      }
   },
   async deletPostById (req:Request , res:Response){
      const existed = await postRepository.getById(req.params.id)
      if (!existed) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      else{
         const deletedPost = await postRepository.deleteById(req.params.id)
         if (deletedPost) {
            res.send(httpStatusCodes.NO_CONTENT)
            return
         }
      }
   }

}