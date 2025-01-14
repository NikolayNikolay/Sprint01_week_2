import { ObjectId } from "mongodb";
import { postCollection } from "../../../db/mongo-db";
import { SortDirections } from "../../../enums/SortDirections.enum";
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations";
import { filter } from "../../../helpers/serchFilter";
import { mapViewPostsModel } from "../../../helpers/viewModelsMapMethod";
import { QueryParamsType } from "../../../types/queryParams";
import { PaginationBlogsType } from "../models/PaginationsBlogsPostsType";



export const blogPostsQueryRepository = {
   async getAllPostsForBlog(blogId:string, queryParams:QueryParamsType):Promise<PaginationBlogsType>{
      const searchFilter = filter(queryParams, blogId)
      const totalCount = await this.totalCountPostsforBlog(searchFilter)
      const PaginationParams = PaginationQueryParams(queryParams)
      let items = null
      if(PaginationParams.searchNameTerm){
         items = await postCollection.find({[PaginationParams.sortBy]: { $regex: PaginationParams.searchNameTerm, $options: "i" },'blogId':blogId })
         .sort(PaginationParams.sortBy,PaginationParams.sortDirection as SortDirections)
         .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
         .limit(PaginationParams.pageSize)
         .toArray()
      }
      else{
      items = await postCollection.find({'blogId':blogId})
         .sort(PaginationParams.sortBy,PaginationParams.sortDirection as SortDirections)
         .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
         .limit(PaginationParams.pageSize)
         .toArray()
      }
      items = mapViewPostsModel(items)
      return{
         pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
         page: PaginationParams.pageNumber,
         pageSize: PaginationParams.pageSize,
         totalCount,
         items: items
      }
   },
   async totalCountPostsforBlog(params?:any){
      return await postCollection.countDocuments(params)
   },
   async getPostforBlog(idPost:ObjectId){
      const post = await postCollection.findOne({'_id': idPost})
      return mapViewPostsModel(post)
   }
}