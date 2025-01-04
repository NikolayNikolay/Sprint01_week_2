import { SortDirections, sortDirections } from "../enums/SortDirections.enum"
import { QueryParams } from "../types/PaginationsBlogsPostsType"




export  const PaginationForBlogsPosts = (queryParams:QueryParams ):QueryParams => {
      return{
      pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
      pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
      sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
      sortDirection: sortDirections.includes(queryParams.sortDirection as SortDirections) ? queryParams.sortDirection as SortDirections  : 'desc',
      searchNameTerm: queryParams.searchNameTerm
   }
}


export const filter = (params:any, blogId?:any)=>{
   const id = blogId ? { blogId: blogId } : {}
   const search = params.searchNameTerm && params.sortBy ? {[params.sortBy]: {$regex: params.searchNameTerm, $options: 'i'}}: {}
   return {...id,...search}
}