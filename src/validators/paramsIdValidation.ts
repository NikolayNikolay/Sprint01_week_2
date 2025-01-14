import { param, body } from "express-validator"
import { ObjectId } from "mongodb"

export const isValidObjectId = param('id').custom((value) => {
                                                                  console.log(ObjectId.isValid(value));
   
                                                                  if (!ObjectId.isValid(value)) {
                                                                     throw new Error('Invalid ID format.')
                                                                  }
                                                                  else{
                                                                  return true
                                                                  }
                                                               })

export const isValidIdObjectFromBody = body('blogId').custom((value) => {
   console.log(ObjectId.isValid(value));

   if (!ObjectId.isValid(value)) {
      throw new Error('Invalid ID format.')
   }
   else{
   return true
   }
})