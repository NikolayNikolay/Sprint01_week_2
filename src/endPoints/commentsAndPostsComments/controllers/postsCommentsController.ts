import { Request,Response } from "express";
import { postCommentsServise } from "../domain/postsCommentsServise";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { queryPostsCommentsRepositotory } from "../repositories/queryPostsCommentsRepository";
import { QueryParamsType } from "../../../types/queryParams";





export const postCommentsController = {
   async createCommentForPost(req:Request, res:Response){
      const result = await postCommentsServise.createCommentForPost(req.body,req.user,req.params.postId)
      const status = resultStatusToHttpStatusCode(result.status)
      res.status(status).json(result.data)
   },
   async getAllCommentsForPost(req:Request | any,res:Response){
      const result = await queryPostsCommentsRepositotory.getAllcommentsForPost(req.query, req.params.postId)
     res.status(resultStatusToHttpStatusCode(result.status)).send(result.data)
   }
}