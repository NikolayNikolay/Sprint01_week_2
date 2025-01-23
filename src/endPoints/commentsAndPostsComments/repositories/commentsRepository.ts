import { ObjectId } from "mongodb";
import { commentsCollection } from "../../../db/mongo-db";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import { CommentViewModel } from "../model/CommentViewModel";
import { mapViewCommentsModel } from "../../../helpers/viewModelsMapMethod";
import { CommentInputModel } from "../model/CommentInputModel";


export const commentsRepository = {
   async getOneCommentById(id:ObjectId):Promise<CommentViewModel | null>{
      const findById = await commentsCollection.findOne({_id:id})
      return findById
   },
   async updateCommentbyId(input:CommentInputModel, id:ObjectId):Promise<boolean>{
      const resultUpdate = await commentsCollection.updateOne({_id : id},{$set : {...input}})
      return resultUpdate.acknowledged
   },
   async deleteCommentbyId(id:ObjectId):Promise<boolean>{
      const resultDeleted = await commentsCollection.deleteOne({_id : id})
      console.log(id, resultDeleted);
      
      return resultDeleted.deletedCount === 1 
   },
}