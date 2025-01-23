
export const filterForCommentsPost = (params:any, Id?:any)=>{
   let id = {}
   if (Id) {
         if (typeof Id === 'string') {
         id = { postId: Id }
         }
         else{
            id = {'_id': Id}
         }
   }
   
   const search = params.searchNameTerm && params.sortBy ? {[params.sortBy]: {$regex: params.searchNameTerm, $options: 'i'}}: {}

   return {...id,...search}
}