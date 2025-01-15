import { body } from "express-validator"
import { queryBlogRepository } from "../../blogs/repository/blogQyeryRepository"
import { ObjectId } from "mongodb"




export const postTitleValidation = body('title').isString().withMessage('not sting').trim().isLength({min:1,max:30}).withMessage('too shortly or more then 30 mathes')

export const postShortDescriptionValidation = body('shortDescription').isString().withMessage('not sting').trim().isLength({min:1,max:100}).withMessage('too shortly or more then 100 mathes')

export const postContentValidation = body('content').isString().withMessage('not sting').trim().isLength({min:1,max:1000}).withMessage('too shortly or more then 1000 mathes')

export const postBlogIdValidation = body('blogId').custom(async (value) => {
   const foundBlog = await queryBlogRepository.getById(new ObjectId(value));
   if (!foundBlog) {
     throw new Error('Blog does not exist');
   }
 })