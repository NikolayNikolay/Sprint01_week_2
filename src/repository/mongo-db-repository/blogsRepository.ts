import { BlogInputModelType } from "../../types/BlogInputModel"
import { BlogViewModelType } from "../../types/BlogViewModel"
import { blogCollection } from "../../db/mongo-db"

export const blogRepository = {
   async create (input:BlogInputModelType ):Promise<BlogViewModelType|boolean>{
      const newBlog = {
         ...input,
         id: Date.now() + Math.random().toString(),
         createdAt: new Date().toISOString(),
         isMembership: false
      }
      const result = await blogCollection.insertOne(newBlog)
      if (result.acknowledged) {
         return newBlog
      }
      return false
   },
   async getAll(){
      const blogs = blogCollection.find({}).toArray()
      return blogs
   },
   async getById(id:string):Promise<BlogViewModelType | boolean>{
      const foundBlog = await blogCollection.findOne({"id": id})
      if (!foundBlog) {
         return false
      }
      return foundBlog
   },
   async update(input:BlogInputModelType, id:string ):Promise<boolean>{
      const existedBlog = await blogCollection.findOne({"id": id})
      if (!existedBlog) {
         return false
      }
      await blogCollection.updateOne({"id": id},{$set : {...input}})
      return true
   },
   async deleteById(id:string){
      const deletedBlog = await blogCollection.deleteOne({"id": id})
      return deletedBlog.deletedCount === 1
   }
}