import { ObjectId } from "mongodb";
import { postRepository } from "../../posts/repository/postRepository";
import { CommentatorInfo } from "../model/CommentatorInfo";
import { CommentInputModel } from "../model/CommentInputModel";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { postsCommentsRepository } from "../repositories/postsCommentsRepository";
import { ResponseObjectType } from "../../../types/ResponseObjectType";



export const postCommentsServise = {
   async createCommentForPost(inputData:CommentInputModel, userInfo:any, postId:string):Promise<ResponseObjectType>{
      
      const checkPost = await postRepository.getById(new ObjectId(postId))
      
      if (!checkPost) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found post',null, {field:'postId', message:'not found'})
      }
      const comment = {
         content: inputData.content,
         commentatorInfo: {
           userId: userInfo.id,
           userLogin: userInfo.name
         },
         createdAt: new Date().toISOString(),
         'postId': postId
       }

      const createdComment = await postsCommentsRepository.createCommentForPost(comment)
      

      if (!createdComment) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found')
      }

      const getComment = await postsCommentsRepository.getCommentById(createdComment)
      console.log(getComment);
      

      if (!getComment) {
         return resultResponsObject(ResultStatus.NotFound,'Not Found')
      }

      return resultResponsObject(ResultStatus.Created,'Created', getComment)

   }
}