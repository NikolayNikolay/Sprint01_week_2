import { DB } from "../db/db"
import { blogRepository } from "./blogsRepository"
import { BlogViewModelType } from "../types/BlogViewModel"
import { PostInputModelType } from "../types/PostInputModel"
import { PostViewModelType } from "../types/PostViewModel"


export const postRepository = {
   create (input:PostInputModelType ): PostViewModelType | boolean{
      const blog = DB.blogs.find(b => b.id === input.blogId)
      if (blog) {
         const newPost = {
            ...input,
            id: Date.now() + Math.random().toString(),
            blogName: blog.name,
            createdAt: new Date().toISOString()
         }
         DB.posts.push(newPost)
         return newPost
      }
      else{
         return false
      }
   },
   getAll(){
      const posts = DB.posts
      return posts
   },
   getById(id:string):PostViewModelType| boolean{
      const foundPost = DB.posts.find(b => b.id === id)
      if (!foundPost) {
         return false
      }
      return foundPost
   },
   update(input:PostInputModelType, id:string ):boolean{
      const updatedPost = DB.posts.find(b => b.id === id)
      if (!updatedPost) {
         return false
      }
      Object.assign(updatedPost, input)
      return true
   },
   deleteById(id:string){
      const deletedPost = DB.posts.filter(p => p.id !== id)
      DB.posts = deletedPost
      const tryFindDeletedPost = postRepository.getById(id)
      return tryFindDeletedPost
   }
}