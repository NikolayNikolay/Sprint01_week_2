import { PostInputModelType } from "../../types/PostInputModel"
import { PostViewModelType } from "../../types/PostViewModel"
import { postCollection } from "../../db/mongo-db"
import { QueryParams } from "../../types/PaginationsBlogsPostsType"
import { SortDirections } from "../../enums/SortDirections.enum"

export const postRepository = {
   async create (newPost:PostViewModelType ): Promise <PostViewModelType | any>{
         const result = await postCollection.insertOne(newPost)
         if (result.acknowledged) {
            return await postCollection.findOne({'id':newPost.id},{projection:{_id:0}})
         }
         return false
   },
   async getAll(paginations:QueryParams){
      return postCollection.find({},{projection:{_id:0}}).sort(paginations.sortBy, paginations.sortDirection as SortDirections)
      .skip((paginations.pageNumber - 1) * paginations.pageSize)
      .limit(paginations.pageSize).toArray()
   },
   async getById(id:string): Promise<PostViewModelType| boolean>{
      const foundPost = await postCollection.findOne({'id':id},{projection:{_id:0}})
      if (!foundPost) {
         return false
      }
      return foundPost
   },
   async update(input:PostInputModelType, id:string ):Promise<boolean>{
      const existedPost = await postCollection.findOne({"id": id})
      if (!existedPost) {
         return false
      }
      const result = await postCollection.updateOne({"id": id},{$set : {...input}})
      return result.acknowledged
   },
   async deleteById(id:string){
      const deletedPost = await postCollection.deleteOne({"id": id})
      return deletedPost.deletedCount === 1
   },
   async totalCountPostsforBlog(params?:any){
      return await postCollection.countDocuments(params)
   }
}