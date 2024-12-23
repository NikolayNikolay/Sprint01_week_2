import { Request, Response } from "express"
import { httpStatusCodes } from "../../settings"
import { PostViewModelType } from "../../types/PostViewModel"
import { PostInputModelType } from "../../types/PostInputModel"
import { postRepository } from "../../repository/postRepository"
import { DB } from "../../db/db"


export const postsController ={
   createPost (req:Request , res:Response){
      const createdPost:PostViewModelType | false = postRepository.create(req.body)
      res.status(httpStatusCodes.CREATED).send(createdPost)
   },
   getAllPosts (req:Request , res:Response){
      const allPosts = postRepository.getAll()
      res.status(httpStatusCodes.OK).send(allPosts)
   },
   getPostById (req:Request , res:Response){
      const fuondPost = postRepository.getById(req.params.id)
      if (!fuondPost) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      res.status(httpStatusCodes.OK).send(fuondPost)
   },
   updatePostById (req:Request , res:Response){
      const updetedPost = postRepository.update(req.body , req.params.id)
      if (!updetedPost) {
         res.send(httpStatusCodes.NOT_FOUND)
      }
      res.send(httpStatusCodes.NO_CONTENT)
   },
   deletPostById (req:Request , res:Response){
      const existed = DB.posts.find(p => p.id === req.params.id)
      if (existed) {
         const deletedPost = postRepository.deleteById(req.params.id)
         if (!deletedPost) {
            res.send(httpStatusCodes.NO_CONTENT)
         }
      }
      res.send(httpStatusCodes.NOT_FOUND)
   }

}