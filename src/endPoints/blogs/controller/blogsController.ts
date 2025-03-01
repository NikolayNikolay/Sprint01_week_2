// import { blogRepository } from "../../repository/blogsRepository" // file database from folder db
import { BlogViewModelType } from "../models/BlogViewModel"
import { Request, Response } from "express"
import {QueryBlogRepository} from '../repository/blogQyeryRepository'
import { BlogsService} from '../domain/blogsService'
import { httpStatusCodes } from "../../../settings"
import { ObjectId } from "mongodb"
import { inject, injectable } from "inversify"

@injectable()
export class BlogController{
   constructor(@inject(BlogsService) protected blogsService:BlogsService,@inject(QueryBlogRepository)  protected queryBlogRepository:QueryBlogRepository){
   }
   async createBlog (req:Request , res:Response){
      const createdBlogId = await this.blogsService.create(req.body)
      if (!createdBlogId) {
         res.send(httpStatusCodes.BAD_REQUEST_400)
         return
      }
      const getCreatedBlog = await this.queryBlogRepository.getById(new ObjectId(createdBlogId))
      
      res.status(httpStatusCodes.CREATED_201).send(getCreatedBlog)
   }
   async getAllBlogs(req:Request | any , res:Response){
      const allBlogs = await this.queryBlogRepository.getAll(req.query) 
      res.status(httpStatusCodes.OK_200).send(allBlogs)
   }
   async getBlogById(req:Request , res:Response){
      const fuondBlog = await this.queryBlogRepository.getById(new ObjectId(req.params.id))
      if (!fuondBlog) {
         res.send(httpStatusCodes.NOT_FOUND_404)
      }
      else {
         res.status(httpStatusCodes.OK_200).send(fuondBlog)
      }
   }
   async updateById(req:Request , res:Response){
      const updetedBlog = await this.blogsService.update(req.body , req.params.id)
      if (!updetedBlog) {
         res.send(httpStatusCodes.NOT_FOUND_404)
      }
      else{
         res.send(httpStatusCodes.NO_CONTENT_204)
      }
   }
   async deletById(req:Request , res:Response){
      const deletedBlog = await this.blogsService.deleteById(req.params.id)
      if (!deletedBlog) {
         res.send(httpStatusCodes.NOT_FOUND_404)
         return
      }
   
       res.send(httpStatusCodes.NO_CONTENT_204)
      return
   }
}

// export const blogController = new BlogController()
// export const createBlogController = async (req:Request , res:Response)=>{
//    const createdBlogId = await blogsService.create(req.body)
//    if (!createdBlogId) {
//       res.send(httpStatusCodes.BAD_REQUEST_400)
//       return
//    }
//    const getCreatedBlog = await queryBlogRepository.getById(new ObjectId(createdBlogId))
   
//    res.status(httpStatusCodes.CREATED_201).send(getCreatedBlog)
// }

// export const getAllBlogController = async (req:Request | any , res:Response)=>{
//    const allBlogs = await queryBlogRepository.getAll(req.query) 
//    res.status(httpStatusCodes.OK_200).send(allBlogs)
// }

// export const getByIdController = async (req:Request , res:Response)=>{
//    const fuondBlog = await queryBlogRepository.getById(new ObjectId(req.params.id))
//    if (!fuondBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//    }
//    else {
//       res.status(httpStatusCodes.OK_200).send(fuondBlog)
//    }
// }

// export const updateByIdController = async (req:Request , res:Response)=>{
//    const updetedBlog = await blogsService.update(req.body , req.params.id)
//    if (!updetedBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//    }
//    else{
//       res.send(httpStatusCodes.NO_CONTENT_204)
//    }
// }

// export const deletByIdController = async (req:Request , res:Response)=>{
//    const deletedBlog = await blogsService.deleteById(req.params.id)
//    if (!deletedBlog) {
//       res.send(httpStatusCodes.NOT_FOUND_404)
//       return
//    }

//     res.send(httpStatusCodes.NO_CONTENT_204)
//    return
// }