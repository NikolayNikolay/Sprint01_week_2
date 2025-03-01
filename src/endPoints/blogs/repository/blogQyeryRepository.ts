import { ObjectId } from "mongodb";
import { blogCollection } from "../../../db/mongo-db";
import { SortDirections } from "../../../enums/SortDirections.enum";
import { QueryParamsType } from "../../../types/queryParams";
import { BlogViewModelType } from "../models/BlogViewModel";
import { filter } from "../../../helpers/serchFilter";
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations";
import { PaginationBlogsType } from "../../blogPosts/models/PaginationsBlogsPostsType";
import { mapViewBlogsModel } from "../../../helpers/viewModelsMapMethod";


export class QueryBlogRepository {
   async getAll(queryParams:QueryParamsType):Promise<PaginationBlogsType>{
      const serchFilter = filter(queryParams)
      const totalCount = await this.totalBlogs(serchFilter)
      const paginationForBlogs = PaginationQueryParams(queryParams)
      let blogs = null
      if(paginationForBlogs.searchNameTerm){
         blogs = await blogCollection.find({[paginationForBlogs.sortBy]: { $regex: paginationForBlogs.searchNameTerm, $options: "i" }})
         .sort(paginationForBlogs.sortBy,paginationForBlogs.sortDirection as SortDirections)
         .skip((paginationForBlogs.pageNumber - 1) * paginationForBlogs.pageSize)
         .limit(paginationForBlogs.pageSize)
         .toArray()
      }
      else{
         blogs = await blogCollection.find({})
         .sort(paginationForBlogs.sortBy,paginationForBlogs.sortDirection as SortDirections)
         .skip((paginationForBlogs.pageNumber - 1) * paginationForBlogs.pageSize)
         .limit(paginationForBlogs.pageSize)
         .toArray()
      }
      blogs = mapViewBlogsModel(blogs)

      return {
         pagesCount: Math.ceil(totalCount / paginationForBlogs.pageSize),
         page: paginationForBlogs.pageNumber,
         pageSize:paginationForBlogs.pageSize ,
         totalCount: totalCount,
         items: blogs
      }

   }
   async getById(id:ObjectId):Promise<BlogViewModelType | boolean>{
      const foundBlog = await blogCollection.findOne({'_id':id})
      if (!foundBlog) {
         return false
      }
      return  mapViewBlogsModel(foundBlog)
   }
   async totalBlogs(params?:any){
      return await blogCollection.countDocuments(params)
   }
}

export const queryBlogRepository = new QueryBlogRepository()