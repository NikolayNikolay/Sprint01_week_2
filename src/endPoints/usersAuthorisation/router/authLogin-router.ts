import { Router } from "express";
import { SETTINGS } from "../../../settings";
import { authLoginController } from "../controller/authLoginController";
import { userloginOrEmailValidations, userPasswordValidations } from "../validators/authInputValidators";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { authenticateUser } from "../midllewarers/authMidllewarer";


export const authLoginRouter = Router()


authLoginRouter.post('/login',userPasswordValidations,userloginOrEmailValidations,inputCheckErrorsMiddleware,authLoginController.authLoginPost)

authLoginRouter.get('/me',authenticateUser,authLoginController.getInformationOfMe)