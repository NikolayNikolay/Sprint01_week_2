// import { blogRepository } from "../../repository/blogsRepository" // file database from folder db
import { BlogViewModelType } from "../../types/BlogViewModel"
import { Request, Response } from "express"
import { httpStatusCodes,SETTINGS } from "../../settings"
import { DB } from "../../db/db"
import { blogRepository } from "../../repository/mongo-db-repository/blogsRepository" // local or cloud database from mongoDB

export const createBlogController = async (req:Request , res:Response)=>{
   const createdBlog = await blogRepository.create(req.body)
   console.log(createdBlog);
   res.status(httpStatusCodes.CREATED).send(createdBlog)
}

export const getAllBlogController = async (req:Request , res:Response)=>{
   const allBlogs = await blogRepository.getAll()
   res.status(httpStatusCodes.OK).send(allBlogs)
}

export const getByIdController = async (req:Request , res:Response)=>{
   const fuondBlog = await blogRepository.getById(req.params.id)
   if (!fuondBlog) {
      res.send(httpStatusCodes.NOT_FOUND)
   }
   else {
      res.status(httpStatusCodes.OK).send(fuondBlog)
   }
}

export const updateByIdController = async (req:Request , res:Response)=>{
   const updetedBlog = await blogRepository.update(req.body , req.params.id)
   if (!updetedBlog) {
      res.send(httpStatusCodes.NOT_FOUND)
   }
   else{
      res.send(httpStatusCodes.NO_CONTENT)
   }
}

export const deletByIdController = async (req:Request , res:Response)=>{
   const existed = await blogRepository.getById(req.params.id)
   if (!existed) {
      res.send(httpStatusCodes.NOT_FOUND)
   }
   else {
      const deletedBlog = await blogRepository.deleteById(req.params.id)
      if (deletedBlog) {
         res.send(httpStatusCodes.NO_CONTENT)
         return
      }
   }
}