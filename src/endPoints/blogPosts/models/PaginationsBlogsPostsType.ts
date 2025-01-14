import { BlogViewModelType } from "../../blogs/models/BlogViewModel"
import { PostViewModelType } from "../../posts/models/PostViewModel"



export type PaginationBlogsType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:BlogViewModelType[]
}

export type PaginationQueryPostsType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:PostViewModelType[]
}

