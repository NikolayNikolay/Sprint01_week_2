import { ObjectId } from "mongodb";
import { blogCollection, postCollection } from "../../../db/mongo-db";
import { BlogViewModelType } from "../../blogs/models/BlogViewModel";



export const blogPostsRepository = {
   async createPostForBlog(newPost:any):Promise <string>{
      const result = await postCollection.insertOne(newPost)
      return result.insertedId.toString()
   },
   async getById(id:ObjectId):Promise <BlogViewModelType | null>{
      const foundBlog = await blogCollection.findOne({'_id':id})
      return foundBlog
   }
}