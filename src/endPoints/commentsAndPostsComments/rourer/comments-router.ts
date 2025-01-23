import { Router } from "express";
import { commentsController } from "../controllers/commentsController";
import { commentContentValidation } from "../validators/commentsValidations";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { isValidObjectId } from "../../../validators/paramsIdValidation";
import { authenticateUser } from "../../usersAuthorisation/midllewarers/authMidllewarer";






export const commentsRouter = Router()





commentsRouter.put('/:commentId',authenticateUser,commentContentValidation,inputCheckErrorsMiddleware,commentsController.updateComments)
commentsRouter.delete('/:commentId',authenticateUser,commentsController.deleteComments)
commentsRouter.get('/:id',isValidObjectId,commentsController.getOneCommentsById)

