import { Router} from "express";
import { authMiddleware } from "../../../middleweares/autorisMiddleweare";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { Request, Response } from "express"
import { usersEmailValidations, usersLoginValidations, usersPasswordValidations } from "../validators/usersValidator";
import { usersController } from "../controller/usersController";
import { isValidObjectId } from "../../../validators/paramsIdValidation";
export const usersRouter = Router()


usersRouter.get('/',authMiddleware, usersController.getAllUsers)
usersRouter.post('/',authMiddleware,usersPasswordValidations,usersLoginValidations,usersEmailValidations,inputCheckErrorsMiddleware,usersController.createUser )
usersRouter.delete('/:id',authMiddleware,isValidObjectId,inputCheckErrorsMiddleware, usersController.deleteUser)
usersRouter.get('/:id',authMiddleware,isValidObjectId,inputCheckErrorsMiddleware, usersController.getUserById)
