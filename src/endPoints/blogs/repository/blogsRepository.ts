import { injectable } from "inversify"
import { blogCollection } from "../../../db/mongo-db"
import { BlogInputModelType } from "../models/BlogInputModel"
import { BlogViewModelType } from "../models/BlogViewModel"
import { ObjectId } from "mongodb"

@injectable()
export class BlogRepository {
   async create (newBlog:BlogViewModelType):Promise< string | null>{
      const resultCreated = await blogCollection.insertOne(newBlog)
     return resultCreated.insertedId.toString()
   }
   async getById(id:ObjectId):Promise<BlogViewModelType | boolean>{
      const foundBlog = await blogCollection.findOne({'_id':id})
      if (!foundBlog) {
         return false
      }
      return  foundBlog
   }
   async update(input:BlogInputModelType, id:ObjectId):Promise<boolean>{
      const isUpdatedBlog =  await blogCollection.updateOne({"_id": id},{$set : {...input}})
      return isUpdatedBlog.acknowledged
   }
   async deleteById(id:ObjectId){
      const deletedBlog = await blogCollection.deleteOne({"_id": id})
      return deletedBlog.deletedCount === 1
   }
   async totalBlogs(params?:any){
      return await blogCollection.countDocuments(params)
   }
}

export const blogRepository = new BlogRepository()