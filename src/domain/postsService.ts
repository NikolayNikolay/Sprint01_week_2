import { PostInputModelType } from "../types/PostInputModel"
import { PostViewModelType } from "../types/PostViewModel"
import { BlogViewModelType } from "../types/BlogViewModel"
import { postRepository } from "../repository/mongo-db-repository/postRepository"
import { blogRepository } from "../repository/mongo-db-repository/blogsRepository"

export const postsService = {
   async create (input:PostInputModelType ): Promise <PostViewModelType | any>{
      const blog = await blogRepository.getById(input.blogId) as BlogViewModelType
      if (blog) {
         const newPost = {
            ...input,
            id: Date.now() + Math.random().toString(),
            blogName: blog.name,
            createdAt: new Date().toISOString()
         }
         return await postRepository.create(newPost)
      }
      else{
         return false
      }
   },
   async getAll(){
      return postRepository.getAll()
   },
   async getById(id:string): Promise<PostViewModelType| boolean>{
      return await postRepository.getById(id)
   },
   async update(input:PostInputModelType, id:string ):Promise<boolean>{
      return await postRepository.update(input, id)
   }, 
   async deleteById(id:string){
      return await postRepository.deleteById(id)
   }
}