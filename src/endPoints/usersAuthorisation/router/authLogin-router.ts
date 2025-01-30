import { Router } from "express";
import { SETTINGS } from "../../../settings";
import { authLoginController } from "../controller/authLoginController";
import { userloginOrEmailValidations, userPasswordValidations } from "../validators/authInputValidators";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { authenticateUser } from "../midllewarers/authMidllewarer";
import { usersLoginValidations, usersEmailValidations } from "../../users/validators/usersValidator";


export const authLoginRouter = Router()


authLoginRouter.post('/login',userPasswordValidations,userloginOrEmailValidations,inputCheckErrorsMiddleware,authLoginController.authLoginPost)

authLoginRouter.get('/me',authenticateUser,authLoginController.getInformationOfMe)

authLoginRouter.post('/registration',userPasswordValidations,usersLoginValidations,usersEmailValidations,inputCheckErrorsMiddleware,authLoginController.rigistrationUser)
authLoginRouter.post('/registration-confirmation',authLoginController.registrationConfirmation)
authLoginRouter.post('/registration-email-resending',usersEmailValidations,inputCheckErrorsMiddleware,authLoginController.resendingEmailForConfirmation)

