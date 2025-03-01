import { Router } from "express";
import { SETTINGS } from "../../../settings";
import { authLoginController } from "../controller/authLoginController";
import { userloginOrEmailValidations } from "../validators/authInputValidators";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { authenticateUser, authRefreshToken } from "../midllewarers/authMidllewarer";
import { usersLoginValidations, usersEmailValidations, usersPasswordValidations } from "../../users/validators/usersValidator";


export const authLoginRouter = Router()


authLoginRouter.post('/login',usersPasswordValidations,userloginOrEmailValidations,inputCheckErrorsMiddleware,authLoginController.authLoginPost)

authLoginRouter.get('/me',authenticateUser,authLoginController.getInformationOfMe)

authLoginRouter.post('/registration',usersPasswordValidations,usersLoginValidations,usersEmailValidations,inputCheckErrorsMiddleware,authLoginController.rigistrationUser)
authLoginRouter.post('/registration-confirmation',authLoginController.registrationConfirmation)
authLoginRouter.post('/registration-email-resending',usersEmailValidations,inputCheckErrorsMiddleware,authLoginController.resendingEmailForConfirmation)
authLoginRouter.post('/refresh-token',authRefreshToken,authLoginController.userRefreshToken)
authLoginRouter.post('/logout',authRefreshToken,authLoginController.userLogOut)

authLoginRouter.post('/password-recovery',usersEmailValidations,inputCheckErrorsMiddleware,authLoginController.passwordRecovery)
authLoginRouter.post('/new-password',usersPasswordValidations,inputCheckErrorsMiddleware,authLoginController.newPassword)




