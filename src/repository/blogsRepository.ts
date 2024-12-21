import { DB } from "../db/db"
import { BlogInputModelType } from "../types/BlogInputModel"
import { BlogViewModelType } from "../types/BlogViewModel"
import {dbType} from '../types/dbTypes'

export const blogRepository = {
   create (input:BlogInputModelType ){
      const newBlog:BlogViewModelType = {
         ...input,
         id: Date.now() + Math.random().toString()
      }
      DB.blogs.push(newBlog)
      return newBlog
   },
   getAll(){
      const blogs = DB.blogs
      return blogs
   },
   getById(id:string){
      const foundBlog = DB.blogs.find(b => b.id === id)
      if (!foundBlog) {
         return false
      }
      return foundBlog
   },
   update(input:BlogInputModelType, id:string ){
      const updatedBlog = DB.blogs.find(b => b.id === id)
      if (!updatedBlog) {
         return false
      }
      Object.assign(updatedBlog, input)
      return true
   },
   deleteById(id:string){
      const deletedBlog = DB.blogs.filter(b => b.id !== id)
      DB.blogs = deletedBlog
      const tryFindDeletedBlog = blogRepository.getById(id)
      return tryFindDeletedBlog
   },
   deleteAllBlogs(){
      DB.blogs = []
      console.log(DB.blogs)
   }
}