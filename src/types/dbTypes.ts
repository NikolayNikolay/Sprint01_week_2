import {BlogViewModelType} from './BlogViewModel'
import { PostViewModelType } from './PostViewModel'

export type dbType = {
   blogs: BlogViewModelType[],
   posts: PostViewModelType [],
   blogsPostsBindings: any[],
}