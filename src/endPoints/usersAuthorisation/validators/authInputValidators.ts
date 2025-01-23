import { body } from "express-validator"

export const userPasswordValidations = body('password').isString().withMessage('not string')

export const userloginOrEmailValidations = body('loginOrEmail').isString().withMessage('not string')