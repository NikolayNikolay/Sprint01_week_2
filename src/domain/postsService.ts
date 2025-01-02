import { PostInputModelType } from "../types/PostInputModel"
import { PostViewModelType } from "../types/PostViewModel"
import { BlogViewModelType } from "../types/BlogViewModel"
import { postRepository } from "../repository/mongo-db-repository/postRepository"
import { blogRepository } from "../repository/mongo-db-repository/blogsRepository"
import { QueryParams } from "../types/PaginationsBlogsPostsType"
import { PaginationForBlogsPosts } from "../helpers/queryParamsForBlogPosts"

export const postsService = {
   async create (input:PostInputModelType, idBlog:any ): Promise <PostViewModelType | any>{
      const checkdId = input.blogId || idBlog
      const blog = await blogRepository.getById(checkdId) as BlogViewModelType
      if (blog) {
         const newPost = {
            ...input,
            id: Date.now() + Math.random().toString(),
            blogName: blog.name,
            blogId:idBlog || input.blogId,
            createdAt: new Date().toISOString()
         }
         console.log( newPost);
         
         return await postRepository.create(newPost)
      }
      else{
         return false
      }
   },
   async getAll(queryParams:QueryParams){
      const totalCount = await postRepository.totalCountPostsforBlog()
      const paginationForBlogsPosts =  PaginationForBlogsPosts(queryParams)
      const posts = await postRepository.getAll(paginationForBlogsPosts)
      return {
         pagesCount: Math.ceil(totalCount / paginationForBlogsPosts.pageSize),
         page: paginationForBlogsPosts.pageNumber,
         pageSize:paginationForBlogsPosts.pageSize ,
         totalCount: totalCount,
         items: posts
      }
   },
   async getById(id:string): Promise<PostViewModelType| boolean>{
      return await postRepository.getById(id)
   },
   async update(input:PostInputModelType, id:string ):Promise<boolean>{
      return await postRepository.update(input, id)
   }, 
   async deleteById(id:string){
      return await postRepository.deleteById(id)
   }
}