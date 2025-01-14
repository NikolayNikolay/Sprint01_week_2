import { body,param } from "express-validator"



export const blogsNameValidation = body('name').isString().withMessage('can not be a number').trim().isLength({min:1, max:15}).withMessage('can not be long then 15 symbols')

export const blogsDescriptionValidation = body('description').isString().withMessage('can not be a number').isLength({min:1, max:500}).withMessage('can not be long then 500 symbols')

export const blogsWebsiteUrlValidation = body('websiteUrl')
                                          .custom((url) =>{
                                             console.log(url)
                                             if (url.length === 0 ) {
                                                throw new Error('Can not be empty');
                                             }
                                             if (url.length > 100 ) {
                                                throw new Error('can not be long then 100 symbols');
                                             }
                                             const pattern = new RegExp(
                                                '^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$');
                                                if (!pattern.test(url)) {
                                                   throw new Error('Not a valid URL');
                                                }
                                             return true
                                          })
export const blogPostsUriParamsIsId = param('id').isNumeric().withMessage('Must be valid id')


export const middlewareValidationArray = [blogsNameValidation,blogsDescriptionValidation,blogsWebsiteUrlValidation]

