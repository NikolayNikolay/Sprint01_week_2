import { body } from "express-validator";


export const usersPasswordValidations = body('password').isString().withMessage('not string').isLength({min:6, max:20}).withMessage('not valid length, must be min 6 mathes or max 20 mathes')

export const usersLoginValidations = body('login').isString().withMessage('not string').isLength({min:3, max:10}).withMessage('not valid length, must be min 3 mathes or max 10 mathes')
                                       .custom((login) =>{
                                          console.log(login)
                                          const pattern = new RegExp(
                                             '^[a-zA-Z0-9_-]*$');
                                             if (!pattern.test(login)) {
                                                throw new Error('Not a valid Login');
                                             }
                                          return true
                                       })

export const usersEmailValidations = body('email').custom((email) =>{
   console.log(email)
   email = email.trim()
   const pattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!pattern.test(email)) {
         throw new Error('Not a valid email');
      }
   return true
})