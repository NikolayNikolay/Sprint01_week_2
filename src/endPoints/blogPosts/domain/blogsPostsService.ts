
import { blogPostsRepository } from "../repository/blog-post-repository";
import { QueryParamsType } from "../../../types/queryParams";
import { PostInputModelType } from "../../posts/models/PostInputModel";
import { ObjectId } from "mongodb";

export const blogPostsService = {
   // frozen method
   async getAllPostsForBlog(blogId:string, queryParams:QueryParamsType ){
      // const searchFilter = filter(queryParams, blogId)
      // const totalCount = await postRepository.totalCountPostsforBlog(searchFilter)
      
      // create paginations params for serch posts of blog
      // const PaginationParams = PaginationQueryParams(queryParams)
      // let getItems = await blogPostsRepository.getAllPostsForBlog(blogId,PaginationParams)
   //    getItems = mapViewPostsModel(getItems)
   //    return {
   //       pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
   //       page: PaginationParams.pageNumber,
   //       pageSize: PaginationParams.pageSize,
   //       totalCount,
   //       items: getItems
   //    }
   },
   async createPostForBlog(postInput:PostInputModelType, blogId:string){
      const blog = await blogPostsRepository.getById(new ObjectId(blogId))
      if (!blog) {
         return false
      }
      const newPost = {
         ...postInput,   
         blogName: blog.name,
         blogId: blogId,
         createdAt: new Date().toISOString()
      }
      const resultIdCreatedPost = await blogPostsRepository.createPostForBlog(newPost)
      return resultIdCreatedPost
   },
}