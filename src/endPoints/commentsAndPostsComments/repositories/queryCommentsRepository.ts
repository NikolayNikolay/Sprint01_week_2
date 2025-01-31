import { ObjectId } from "mongodb";
import { commentsCollection } from "../../../db/mongo-db";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import { CommentViewModel } from "../model/CommentViewModel";
import { mapViewCommentsModel } from "../../../helpers/viewModelsMapMethod";





export const queryCommentsRepository= {
   async getOneCommentById(id:ObjectId):Promise<ResponseObjectType< CommentViewModel | null >>{
      const findById = await commentsCollection.findOne({_id:id})
      if (!findById) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found', null,{ errorsMessages: [{ message: 'incorrect Id', field: 'id' }]})
      }
      const mapCommentViewModel = mapViewCommentsModel(findById)
      return resultResponsObject(ResultStatus.Success,'Success', mapCommentViewModel)
   }
}