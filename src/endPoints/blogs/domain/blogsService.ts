import { ObjectId } from "mongodb"
import { BlogInputModelType } from "../models/BlogInputModel"
import { BlogViewModelType } from "../models/BlogViewModel"
import { blogRepository } from "../repository/blogsRepository"
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations"
import { mapViewBlogsModel } from "../../../helpers/viewModelsMapMethod"
import {  PaginationBlogsType } from "../../blogPosts/models/PaginationsBlogsPostsType"
import { QueryParamsType } from "../../../types/queryParams"
import { filter } from "../../../helpers/serchFilter"

export const blogsService = {
   async create (input:BlogInputModelType ):Promise<string | null >{
      const newBlog = {
         ...input,
         createdAt: new Date().toISOString(),
         isMembership: false
      }
      const resultId = await blogRepository.create(newBlog)
      console.log(resultId);
      return resultId
   },
   async getById(id:string):Promise<BlogViewModelType | boolean>{
      const blog = await blogRepository.getById(new ObjectId(id))
      if (blog) {
         return mapViewBlogsModel(blog)
      }
      return false
   },
   async update(input:BlogInputModelType, id:string ):Promise<boolean>{
      const blog = await blogRepository.getById(new ObjectId(id))
      if (!blog) {
         return false
      }
      return await blogRepository.update(input,new ObjectId(id))

   },
   async deleteById(id:string){
      return await blogRepository.deleteById(new ObjectId(id))
   }
}