import { PaginationQueryPostsType, QueryParams } from "../types/PaginationsBlogsPostsType";
import { blogPostsRepository } from "../repository/mongo-db-repository/blog-post-repository";
import { postRepository } from "../repository/mongo-db-repository/postRepository";
import { SortDirections, sortDirections } from "../enums/SortDirections.enum";
import { filter, PaginationForBlogsPosts } from "../helpers/queryParamsForBlogPosts";

export const blogPostsService = {
   async getAllPostsForBlog(blogId:any, queryParams:QueryParams ):Promise<PaginationQueryPostsType>{
      const searchFilter = filter(queryParams)
      const totalCount = await postRepository.totalCountPostsforBlog(blogId)
      
      // create paginations params for serch posts of blog
      const PaginationParams = PaginationForBlogsPosts(queryParams)
      const getItems = await blogPostsRepository.getAllPostsForBlog(blogId,PaginationParams)

      return {
         pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
         page: PaginationParams.pageNumber,
         pageSize: PaginationParams.pageSize,
         totalCount,
         items: getItems
      }
   }
}