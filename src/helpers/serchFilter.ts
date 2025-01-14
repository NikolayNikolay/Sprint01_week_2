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
   return {...id,...search}
}