import { Request, Response, NextFunction } from "express"
import { body,validationResult, check } from "express-validator"



export const blogsNameValidation = body('name').isString().withMessage('can not be a number').trim().isLength({min:1, max:15}).withMessage('can not be long then 15 symbols')

export const blogsDescriptionValidation = body('description').isString().withMessage('can not be a number').isLength({min:1, max:500}).withMessage('can not be long then 500 symbols')

export const blogsWebsiteUrlValidation = body('websiteUrl').isString().withMessage('can not be a number')
                                          .trim().isLength({max:100}).withMessage('can not be long then 100 symbols')
                                          .custom((url) =>{
                                             const pattern = new RegExp(
                                                "/^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/");

                                                if (!pattern.test(url)) {
                                                   console.log(pattern.test(url))
                                                   throw new Error('Not a valid URL');
                                               }
                                               return true
                                          })


export const middlewareValidationArray = [blogsNameValidation,blogsDescriptionValidation,blogsWebsiteUrlValidation]


export const inputCheckErrorsMiddleware = (req:Request, res:Response, next:NextFunction) => {
   const e = validationResult(req)
   const errors = e.array({onlyFirstError:true})
   
   if (errors.length > 0) {
      res.status(400).send({ errorsMessages: errors.map((err:any)=>{return {message: err.msg, field:err.path}}) })
      return
   }
   next()
}
