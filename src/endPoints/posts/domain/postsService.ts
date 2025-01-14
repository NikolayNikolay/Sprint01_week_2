
import { ObjectId } from "mongodb"
import { PostInputModelType } from "../models/PostInputModel";
import { PostViewModelType } from "../models/PostViewModel";
import { blogRepository } from "../../blogs/repository/blogsRepository";
import { postRepository } from "../repository/postRepository";
import { mapViewPostsModel } from "../../../helpers/viewModelsMapMethod";

export const postsService = {
   async create (input:PostInputModelType ): Promise <string | null>{
      const blog:any = await blogRepository.getById(new ObjectId(input.blogId))
      console.log(blog);
      if (!blog) {
         return null
      }
      const newPost = {
         ...input,   
         blogName: blog.name,
         blogId:blog._id.toString(),
         createdAt: new Date().toISOString()
      }
      const resultId = await postRepository.create(newPost)
      return resultId
   },
   // async getAll(queryParams:QueryParamsType){
   //    const totalCount = await postRepository.totalCountPosts()
   //    const paginationForBlogsPosts =  PaginationQueryParams(queryParams)
   //    let posts = await postRepository.getAll(paginationForBlogsPosts)
   //    posts = mapViewPostsModel(posts)
   //    return {
   //       pagesCount: Math.ceil(totalCount / paginationForBlogsPosts.pageSize),
   //       page: paginationForBlogsPosts.pageNumber,
   //       pageSize:paginationForBlogsPosts.pageSize ,
   //       totalCount: totalCount,
   //       items: posts
   //    }
   // },
   async getById(id:string): Promise<PostViewModelType| boolean>{
      const createdPost = await postRepository.getById(new ObjectId(id))
      if (createdPost) {
         return mapViewPostsModel(createdPost)
      }
      return false
   },
   async update(input:PostInputModelType, id:string ):Promise<boolean>{
      const existedPost = await postRepository.getById(new ObjectId(id))
      if (!existedPost) {
         return false
      }
      return await postRepository.update(input, new ObjectId(id))
   }, 
   async deleteById(id:string){
      return await postRepository.deleteById(new ObjectId(id))
   }
}