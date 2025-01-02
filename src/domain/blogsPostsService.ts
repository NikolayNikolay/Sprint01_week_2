import { PaginationQueryPostsType, QueryParams } from "../types/PaginationsBlogsPostsType";
import { blogPostsRepository } from "../repository/mongo-db-repository/blog-post-repository";
import { postRepository } from "../repository/mongo-db-repository/postRepository";
import { SortDirections, sortDirections } from "../enums/SortDirections.enum";

export const blogPostsService = {
   async getAllPostsForBlog(blogId:any, queryParams:QueryParams ):Promise<PaginationQueryPostsType>{
      const totalCount = await postRepository.totalCountPostsforBlog(blogId)
      // create paginations params for serch posts of blog
      const postsPaginationForBlog = {
         pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
         pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
         sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
         sortDirection: sortDirections.includes(queryParams.sortDirection as SortDirections) ? queryParams.sortDirection as SortDirections  : 'desc'
      }
      const getItems = await blogPostsRepository.getAllPostsForBlog(blogId,postsPaginationForBlog)

      return {
         pagesCount: Math.ceil(totalCount / postsPaginationForBlog.pageSize),
         page: postsPaginationForBlog.pageNumber,
         pageSize: postsPaginationForBlog.pageSize,
         totalCount,
         items: getItems
      }
   }
}