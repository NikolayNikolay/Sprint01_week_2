import { Request,Response } from "express";
import { commentsServise } from "../domain/comentsServise";
import { ResultStatus } from "../../../enums/resultStatus";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { queryCommentsRepository } from "../repositories/queryCommentsRepository";
import { ObjectId } from "mongodb";




export const commentsController = {
   async updateComments(req:Request,res:Response){
      const updateResult = await commentsServise.updateComment(req.body, req.params.commentId , req.user.id)
      res.send(resultStatusToHttpStatusCode(updateResult.status))
   },
   async getOneCommentsById(req:Request,res:Response){
      console.log(req.params.id);
      
      const foundResult = await queryCommentsRepository.getOneCommentById(new ObjectId(req.params.id))
      res.status(resultStatusToHttpStatusCode(foundResult.status)).send(foundResult.data)
   },
   async deleteComments(req:Request,res:Response){
      const deletedResult = await commentsServise.deleteComent(req.params.commentId, req.user.id)
      res.send(resultStatusToHttpStatusCode(deletedResult.status))
   }
}