import { body } from "express-validator"
// import { blogRepository } from "../repository/blogsRepository" // file database from folder db
import { blogRepository } from "../repository/mongo-db-repository/blogsRepository" // local or cloud database from mongoDB



export const postTitleValidation = body('title').isString().withMessage('not sting').trim().isLength({min:1,max:30}).withMessage('too sortly or more then 30 mathes')

export const postShortDescriptionValidation = body('shortDescription').isString().withMessage('not sting').trim().isLength({min:1,max:100}).withMessage('too sortly or more then 100 mathes')

export const postContentValidation = body('content').isString().withMessage('not sting').trim().isLength({min:1,max:1000}).withMessage('too sortly or more then 1000 mathes')

export const postBlogIdValidation = body('blogId').isString().withMessage('not string').custom(async (id)=>{
   const fuondBlog = await blogRepository.getById(id)
   if (!fuondBlog) {
      throw new Error('Blog dose not exist')
   }
   return true
})