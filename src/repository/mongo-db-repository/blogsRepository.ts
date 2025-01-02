import { BlogInputModelType } from "../../types/BlogInputModel"
import { BlogViewModelType } from "../../types/BlogViewModel"
import { blogCollection } from "../../db/mongo-db"

export const blogRepository = {
   async create (newBlog:BlogViewModelType):Promise<BlogViewModelType | any >{
     return await blogCollection.insertOne(newBlog)
   },
   async getAll(){
      const blogs = blogCollection.find({},{projection:{_id:0}}).toArray()
      return blogs
   },
   async getById(id:string):Promise<BlogViewModelType | boolean>{
      const foundBlog = await blogCollection.findOne({"id": id},{projection:{_id:0}})
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