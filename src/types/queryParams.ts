export type QueryParamsType = {
   pageNumber: number,
   pageSize: number,
   sortBy: string ,
   sortDirection: string,
   searchNameTerm?: string,
   searchLoginTerm?:string,
   searchEmailTerm?:string
}