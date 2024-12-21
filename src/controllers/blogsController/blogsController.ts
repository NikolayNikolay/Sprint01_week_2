import { blogRepository } from "../../repository/blogsRepository"
import { BlogViewModelType } from "../../types/BlogViewModel"
import { Request, Response } from "express"
import { httpStatusCodes,SETTINGS } from "../../settings"
import { DB } from "../../db/db"

export const createBlogController = (req:Request , res:Response)=>{
   const createdBlog :BlogViewModelType = blogRepository.create(req.body)
   res.status(httpStatusCodes.CREATED).send(createdBlog)
}

export const getAllBlogController = (req:Request , res:Response)=>{
   const allBlogs = blogRepository.getAll()
   res.status(httpStatusCodes.OK).send(allBlogs)
}

export const getByIdController = (req:Request , res:Response)=>{
   const fuondBlog = blogRepository.getById(req.params.id)
   if (!fuondBlog) {
      res.send(httpStatusCodes.NOT_FOUND)
   }
   res.status(httpStatusCodes.OK).send(fuondBlog)
}

export const updateByIdController = (req:Request , res:Response)=>{
   const updetedBlog = blogRepository.update(req.body , req.params.id)
   if (!updetedBlog) {
      res.send(httpStatusCodes.NOT_FOUND)
   }
   res.send(httpStatusCodes.NO_CONTENT)
}

export const deletByIdController = (req:Request , res:Response)=>{
   const deletedBlog = blogRepository.deleteById(req.params.id)
   if (!deletedBlog) {
      res.send(httpStatusCodes.NO_CONTENT)
   }
   res.send(httpStatusCodes.NOT_FOUND)
}

export const deletAllBlogsController = (req:Request , res:Response)=>{
   console.log(req.url)
   if (req.url === SETTINGS.PATH.dellAllData) {
      blogRepository.deleteAllBlogs()
      const isEmptyBlogs = blogRepository.getAll()
      if (isEmptyBlogs === DB.blogs) {
         res.send(httpStatusCodes.NO_CONTENT)
      }
   }
}