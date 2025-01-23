
export type PaginationType<ViewModel = null> = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items:ViewModel
}