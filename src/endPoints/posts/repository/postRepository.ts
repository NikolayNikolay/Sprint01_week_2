import { PostInputModelType } from "../models/PostInputModel"
import { PostViewModelType } from "../models/PostViewModel"
import { postCollection } from "../../../db/mongo-db"

import { ObjectId } from "mongodb"

export const postRepository = {
   async create (newPost:any ): Promise <string>{
         const result = await postCollection.insertOne(newPost)
         return result.insertedId.toString()
   },
   async getById(id:ObjectId): Promise<PostViewModelType| boolean>{
      const foundPost = await postCollection.findOne({'_id':id})
      if (!foundPost) {
         return false
      }
      return foundPost
   },
   async update(input:PostInputModelType, id:ObjectId ):Promise<boolean>{
      const result = await postCollection.updateOne({"_id": id},{$set : {...input}})
      return result.acknowledged
   },
   async deleteById(id:ObjectId){
      const deletedPost = await postCollection.deleteOne({"_id": id})
      return deletedPost.deletedCount === 1
   },
   async totalCountPosts(params?:any){
      return await postCollection.countDocuments(params)
   }
}