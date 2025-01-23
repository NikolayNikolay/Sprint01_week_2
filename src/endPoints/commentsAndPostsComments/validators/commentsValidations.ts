import { body } from "express-validator";




export const commentContentValidation = body('content').isString().withMessage('must be string').isLength({min:20 , max:300})
