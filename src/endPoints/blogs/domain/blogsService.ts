import { ObjectId } from "mongodb"
import { BlogInputModelType } from "../models/BlogInputModel"
import { BlogViewModel, BlogViewModelType } from "../models/BlogViewModel"
import { BlogRepository} from "../repository/blogsRepository"
import { mapViewBlogsModel } from "../../../helpers/viewModelsMapMethod"
import { inject, injectable } from "inversify"


@injectable()
export class BlogsService{
   constructor(
      @inject(BlogRepository) 
      public readonly blogRepository: BlogRepository){
   }
   async create (input:BlogInputModelType ):Promise<string | null >{
      const newBlog = new BlogViewModel(input.name,input.description,input.websiteUrl,new Date().toISOString(),false)
      const resultId = await this.blogRepository.create(newBlog)
      return resultId
   }
   async getById(id:string):Promise<BlogViewModelType | boolean>{
      const blog = await this.blogRepository.getById(new ObjectId(id))
      if (blog) {
         return mapViewBlogsModel(blog)
      }
      return false
   }
   async update(input:BlogInputModelType, id:string ):Promise<boolean>{
      const blog = await this.blogRepository.getById(new ObjectId(id))
      if (!blog) {
         return false
      }
      return await this.blogRepository.update(input,new ObjectId(id))

   }
   async deleteById(id:string){
      return await this.blogRepository.deleteById(new ObjectId(id))
   }
}

// export const blogsService = new BlogsService()