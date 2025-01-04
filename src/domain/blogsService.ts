import { BlogInputModelType } from "../types/BlogInputModel"
import { BlogViewModelType } from "../types/BlogViewModel"
import { blogRepository } from "../repository/mongo-db-repository/blogsRepository"
import { PaginationBlogsType, QueryParams } from "../types/PaginationsBlogsPostsType"
import { filter, PaginationForBlogsPosts } from "../helpers/queryParamsForBlogPosts"

export const blogsService = {
   async create (input:BlogInputModelType ):Promise<BlogViewModelType | any >{
      const newBlog = {
         ...input,
         id: Date.now() + Math.random().toString(),
         createdAt: new Date().toISOString(),
         isMembership: false
      }
      const result = await blogRepository.create(newBlog)
      if (result.acknowledged) {
         return blogRepository.getById(newBlog.id)
      }
      return false
   },
   async getAll(blogId:any,queryParams: QueryParams):Promise<PaginationBlogsType> {
      const serchFilter = filter(queryParams)
      const totalCount = await blogRepository.totalBlogs(serchFilter)
      const paginationForBlogs = PaginationForBlogsPosts(queryParams)
      const blogs = await blogRepository.getAll(paginationForBlogs)
      return {
         pagesCount: Math.ceil(totalCount / paginationForBlogs.pageSize),
         page: paginationForBlogs.pageNumber,
         pageSize:paginationForBlogs.pageSize ,
         totalCount: totalCount,
         items: blogs
      }

   },
   async getById(id:string):Promise<BlogViewModelType | boolean>{
      return await blogRepository.getById(id)
   },
   async update(input:BlogInputModelType, id:string ):Promise<boolean>{
      return blogRepository.update(input,id)

   },
   async deleteById(id:string){
      return blogRepository.deleteById(id)
   }
}