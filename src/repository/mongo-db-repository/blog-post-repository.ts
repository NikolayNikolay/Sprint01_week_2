import { postCollection } from "../../db/mongo-db";
import { SortDirections } from "../../enums/SortDirections.enum";
import {  QueryParams } from "../../types/PaginationsBlogsPostsType";
import { PostViewModelType } from "../../types/PostViewModel";



export const blogPostsRepository = {
   async getAllPostsForBlog(blogId:any,paginations:QueryParams):Promise<PostViewModelType[]>{
      
      const items = await postCollection.find({'blogId':blogId},{projection:{_id:0}})
      .sort(paginations.sortBy, paginations.sortDirection as SortDirections)
      .skip((paginations.pageNumber - 1) * paginations.pageSize)
      .limit(paginations.pageSize)
      .toArray()
      return items
   }
}