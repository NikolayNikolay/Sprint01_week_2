import { ObjectId } from "mongodb"
import { EmailConfirmation } from "../../usersAuthorisation/models/UserRegistrationConfimationModel"

export type UserViewModel= {
   id?: string
   login: string
   email: string
   createdAt: string
   password?: string
   emailConfirmation?:EmailConfirmation
}

export type PaginationQueryUsersType = { 
   pagesCount: number,
   page: number,
   pageSize: number,
   totalCount: number,
   items?:UserViewModel[]
}


export type UserViewModelWith_id = UserViewModel &  {
   _id: ObjectId
}