import { ObjectId } from "mongodb"
import { CommentatorInfo } from "./CommentatorInfo"

export type CommentViewModel = {
   _id?:ObjectId,
   id?:	string,
   content:	string,
   commentatorInfo: CommentatorInfo,
   createdAt:	string
   postId?: string
}