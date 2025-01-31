import { ObjectId } from "mongodb";
import { commentsCollection, postCollection } from "../../../db/mongo-db";
import { QueryParamsType } from "../../../types/queryParams";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations";
import { filterForCommentsPost } from "../helpers/searchFilter";
import { SortDirections } from "../../../enums/SortDirections.enum";
import { mapViewCommentsModel } from "../../../helpers/viewModelsMapMethod";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import { CommentViewModel } from "../model/CommentViewModel";






export const queryPostsCommentsRepositotory = {
   async getAllcommentsForPost(queryParams:QueryParamsType, postId:string):Promise<ResponseObjectType<CommentViewModel[] | null>>{
      const checkPost = await postCollection.findOne({_id: new ObjectId(postId)})
      console.log(checkPost);
      if (!checkPost) {
         return resultResponsObject(ResultStatus.NotFound,"Not found")
      }
      const searchFilter = filterForCommentsPost(queryParams, postId)
      const totalCount = await this.totalCountCommentsForPost(searchFilter)
      const PaginationParams = PaginationQueryParams(queryParams)

      let comments = await commentsCollection.find({'postId': postId}).sort(PaginationParams.sortBy,PaginationParams.sortDirection as SortDirections)
      .skip((PaginationParams.pageNumber - 1) * PaginationParams.pageSize)
      .limit(PaginationParams.pageSize)
      .toArray()

      comments = mapViewCommentsModel(comments)

      const responsData = {
         pagesCount: Math.ceil(totalCount / PaginationParams.pageSize),
         page: PaginationParams.pageNumber,
         pageSize: PaginationParams.pageSize,
         totalCount,
         items: comments
      }

      return resultResponsObject(ResultStatus.Success,'Success', responsData )

   },
   async totalCountCommentsForPost(params:any){
      return commentsCollection.countDocuments(params)
   }
}