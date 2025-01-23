import { ObjectId } from "mongodb"
import { commentsCollection } from "../../../db/mongo-db"
import { CommentViewModel } from "../model/CommentViewModel"
import { mapViewCommentsModel } from "../../../helpers/viewModelsMapMethod"



export const postsCommentsRepository = {
   async createCommentForPost(comment:CommentViewModel):Promise<ObjectId>{
      const commentForPost = await commentsCollection.insertOne(comment)
      return commentForPost.insertedId
   },
   async getCommentById(commentId:ObjectId):Promise<CommentViewModel | null>{
      const foundComment = await commentsCollection.findOne({_id: commentId})
      return mapViewCommentsModel(foundComment)
   }
}