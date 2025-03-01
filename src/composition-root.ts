import { Container, inject, injectable } from 'inversify';
import { BlogController } from "./endPoints/blogs/controller/blogsController";
import { BlogsService } from "./endPoints/blogs/domain/blogsService";
import { QueryBlogRepository } from "./endPoints/blogs/repository/blogQyeryRepository";
import { BlogRepository } from "./endPoints/blogs/repository/blogsRepository";

export const container:Container = new Container()

//blogs 
container.bind(BlogRepository).to(BlogRepository)
container.bind(QueryBlogRepository).to(QueryBlogRepository)
container.bind(BlogsService).to(BlogsService)
container.bind(BlogController).to(BlogController)

//

