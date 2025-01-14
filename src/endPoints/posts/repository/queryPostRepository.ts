import { ObjectId } from "mongodb"
import { postCollection } from "../../../db/mongo-db"
import { QueryParamsType } from "../../../types/queryParams"
import { PostViewModelType } from "../models/PostViewModel"
import { SortDirections } from "../../../enums/SortDirections.enum"
import { filter } from "../../../helpers/serchFilter"
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations"
import { mapViewPostsModel } from "../../../helpers/viewModelsMapMethod"



export const postQueryRepository = {
   async getAll(queryParams:QueryParamsType){
      const serchFilter = filter(queryParams)
      const totalCount = await this.totalPosts(serchFilter)
      const paginationForPosts = PaginationQueryParams(queryParams)
      let posts = null
      if (paginationForPosts.searchNameTerm) {
         posts = await postCollection.find({[paginationForPosts.sortBy]:{ $regex: paginationForPosts.searchNameTerm, $options: "i" }}).sort(paginationForPosts.sortBy, paginationForPosts.sortDirection as SortDirections)
         .skip((paginationForPosts.pageNumber - 1) * paginationForPosts.pageSize)
         .limit(paginationForPosts.pageSize).toArray()
      }
      else{
      posts = await postCollection.find({}).sort(paginationForPosts.sortBy, paginationForPosts.sortDirection as SortDirections)
      .skip((paginationForPosts.pageNumber - 1) * paginationForPosts.pageSize)
      .limit(paginationForPosts.pageSize).toArray()
      }
      posts = mapViewPostsModel(posts)
      return {
         pagesCount: Math.ceil(totalCount / paginationForPosts.pageSize),
         page: paginationForPosts.pageNumber,
         pageSize:paginationForPosts.pageSize ,
         totalCount: totalCount,
         items: posts
      }
   },
   async getById(id:ObjectId): Promise<PostViewModelType| boolean>{
      const foundPost = await postCollection.findOne({'_id':id})
      if (!foundPost) {
         return false
      }
      return mapViewPostsModel(foundPost)
   },
   async totalPosts(params?:any){
      return await postCollection.countDocuments(params)
   }

}