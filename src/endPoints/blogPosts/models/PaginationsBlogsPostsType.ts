import { BlogViewModelType } from "../../blogs/models/BlogViewModel"
import { PostViewModelType } from "../../posts/models/PostViewModel"


// must be redane becouse need to use generick exampl : 
// export type PaginationType<ViewModel = null> = { 
//    pagesCount: number,
//    page: number,
//    pageSize: number,
//    totalCount: number,
//    items:ViewModel
// }

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

