import { ObjectId } from "mongodb";
import { CommentInputModel } from "../model/CommentInputModel";
import { commentsRepository } from "../repositories/commentsRepository";
import { ResultStatus } from "../../../enums/resultStatus";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResponseObjectType } from "../../../types/ResponseObjectType";



export const commentsServise = {
   async updateComment(input:CommentInputModel, commentId:string , userId:string):Promise<ResponseObjectType>{
      const canBeUpdate = await commentsRepository.getOneCommentById(new ObjectId(commentId))
      
      if (!canBeUpdate) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found', null,{ errorsMessages: [{ message: 'incorrect Id', field: 'commentId' }] } )
      }
      
      if (canBeUpdate.commentatorInfo.userId !== userId) {
         return resultResponsObject(ResultStatus.Forbidden,'Forbidden', null,{ errorsMessages: [{ message: 'Forbidden act', field: 'commentId' }] })
      }
      
      const resultUpdate = await commentsRepository.updateCommentbyId(input, new ObjectId(commentId))
      if (!resultUpdate) {
         return resultResponsObject(ResultStatus.BadRequest,'Bad Request', null,{ errorsMessages: [{ message: 'somthing wrong', field: 'input data' }]})
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'SuccessNoContent')
   },
   //
   async deleteComent(id:string,userId:string):Promise<ResponseObjectType>{
      const canBeDeleted = await commentsRepository.getOneCommentById(new ObjectId(id))
      if (!canBeDeleted) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found', null,{ errorsMessages: [{ message: 'incorrect Id', field: 'commentId' }]})
      }
      
      if (canBeDeleted.commentatorInfo.userId !== userId) {
         return resultResponsObject(ResultStatus.Forbidden,'Forbidden', null, { errorsMessages: [{ message: 'Forbidden act', field: 'commentId' }]})
      }

      const deletedResult = await commentsRepository.deleteCommentbyId(new ObjectId(id))
      
      if (!deletedResult) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found', null,{ errorsMessages: [{ message: 'somthing wrong', field: 'somthing wrong' }] } )
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,'SuccessNoContent')
   }
}