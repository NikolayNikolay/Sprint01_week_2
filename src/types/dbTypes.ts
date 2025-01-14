
import { BlogViewModelType } from '../endPoints/blogs/models/BlogViewModel'
import { PostViewModelType } from '../endPoints/posts/models/PostViewModel'

export type dbType = {
   blogs: BlogViewModelType[],
   posts: PostViewModelType [],
   blogsPostsBindings: any[],
}