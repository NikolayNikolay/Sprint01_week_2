import { blogCollection } from "../../../db/mongo-db"
import { SortDirections } from "../../../enums/SortDirections.enum"
import { QueryParamsType } from "../../../types/queryParams"
import { BlogInputModelType } from "../models/BlogInputModel"
import { BlogViewModelType } from "../models/BlogViewModel"
import { ObjectId } from "mongodb"

export const blogRepository = {
   async create (newBlog:BlogViewModelType):Promise< string | null>{
      const resultCreated = await blogCollection.insertOne(newBlog)
     return resultCreated.insertedId.toString()
   },
   // async getAll(paginations:QueryParamsType):Promise<BlogViewModelType[]>{
   //    console.log(paginations);
      
   //    let items= null
   //    if(paginations.searchNameTerm){
   //       items = await blogCollection.find({[paginations.sortBy]: { $regex: paginations.searchNameTerm, $options: "i" }})
   //       .sort(paginations.sortBy,paginations.sortDirection as SortDirections)
   //       .skip((paginations.pageNumber - 1) * paginations.pageSize)
   //       .limit(paginations.pageSize)
   //       .toArray()
   //       return items
   //    }
   //    items = await blogCollection.find({})
   //       .sort(paginations.sortBy,paginations.sortDirection as SortDirections)
   //       .skip((paginations.pageNumber - 1) * paginations.pageSize)
   //       .limit(paginations.pageSize)
   //       .toArray()
   //       return items
   // },
   async getById(id:ObjectId):Promise<BlogViewModelType | boolean>{
      const foundBlog = await blogCollection.findOne({'_id':id})
      if (!foundBlog) {
         return false
      }
      return  foundBlog
   },
   async update(input:BlogInputModelType, id:ObjectId):Promise<boolean>{
      const isUpdatedBlog =  await blogCollection.updateOne({"_id": id},{$set : {...input}})
      return isUpdatedBlog.acknowledged
   },
   async deleteById(id:ObjectId){
      const deletedBlog = await blogCollection.deleteOne({"_id": id})
      return deletedBlog.deletedCount === 1
   },
   async totalBlogs(params?:any){
      return await blogCollection.countDocuments(params)
   }
}