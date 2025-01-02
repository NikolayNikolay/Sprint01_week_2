import { BlogViewModelType } from "./BlogViewModel"
import { PostViewModelType } from "./PostViewModel"



export type PaginationBlogsType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:[ BlogViewModelType]
}

export type PaginationQueryPostsType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:PostViewModelType[]
}

export type QueryParams = {
   pageNumber: number,
   pageSize: number,
   sortBy: string ,
   sortDirection: string,
}