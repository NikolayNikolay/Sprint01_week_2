import { body } from "express-validator"


export const userloginOrEmailValidations = body('loginOrEmail').isString().withMessage('not string')