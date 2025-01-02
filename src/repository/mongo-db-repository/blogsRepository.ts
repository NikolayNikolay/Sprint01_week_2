import { BlogInputModelType } from "../../types/BlogInputModel"
import { BlogViewModelType } from "../../types/BlogViewModel"
import { blogCollection } from "../../db/mongo-db"
import { PaginationBlogsType, QueryParams } from "../../types/PaginationsBlogsPostsType"
import { SortDirections } from "../../enums/SortDirections.enum"

export const blogRepository = {
   async create (newBlog:BlogViewModelType):Promise<BlogViewModelType | any >{
     return await blogCollection.insertOne(newBlog)
   },
   async getAll(paginations:QueryParams):Promise<BlogViewModelType[]>{
      return blogCollection.find({},{projection:{_id:0}}).sort(paginations.sortBy, paginations.sortDirection as SortDirections)
      .skip((paginations.pageNumber - 1) * paginations.pageSize)
      .limit(paginations.pageSize).toArray()
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
   },
   async totalBlogs(params?:any){
      const filter:any = {}
      if (params) {
         filter.blogId = params
      }
      return await blogCollection.countDocuments(filter)
   }
}