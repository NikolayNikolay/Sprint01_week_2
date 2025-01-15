import { ObjectId } from "mongodb"


export const filter = (params:any, Id?:any)=>{
   let id = {}
   if (Id) {
         if (typeof Id === 'string') {
         id = { blogId: Id }
         }
         else{
            id = {'_id': Id}
         }
   }
   
   const search = params.searchNameTerm && params.sortBy ? {[params.sortBy]: {$regex: params.searchNameTerm, $options: 'i'}}: {}
   const loginOrEmail = params.searchLoginTerm || params.searchEmailTerm ? {"login": { "$regex": params.searchLoginTerm, "$options": "i" },
  "email": { "$regex": params.searchEmailTerm , "$options": "i" }} : {}
   return {...id,...search,...loginOrEmail}
}