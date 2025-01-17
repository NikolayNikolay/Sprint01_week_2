
export type UserViewModel= {
   id: string
   login: string
   email: string
   createdAt: string
}

export type PaginationQueryUsersType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:UserViewModel[]
}