import { PostInputModelType } from "../../types/PostInputModel"
import { PostViewModelType } from "../../types/PostViewModel"
import { BlogViewModelType } from "../../types/BlogViewModel"
import { postCollection } from "../../db/mongo-db"
import { blogCollection } from "../../db/mongo-db"

export const postRepository = {
   async create (input:PostInputModelType ): Promise <PostViewModelType | boolean>{
      const blog = await blogCollection.findOne({'id':input.blogId})
      if (blog) {
         const newPost = {
            ...input,
            id: Date.now() + Math.random().toString(),
            blogName: blog.name,
            createdAt: new Date().toISOString()
         }
         const result = await postCollection.insertOne(newPost)
      if (result.acknowledged) {
         return newPost
      }
      return false
      }
      else{
         return false
      }
   },
   async getAll(){
      return postCollection.find({},{projection:{_id:0}}).toArray()
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
      await postCollection.updateOne({"id": id},{$set : {...input}})
      return true
   },
   async deleteById(id:string){
      const deletedPost = await postCollection.deleteOne({"id": id})
      return deletedPost.deletedCount === 1
   }
}