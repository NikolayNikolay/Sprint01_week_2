import { Router} from "express";
import { authMiddleware } from "../../../middleweares/autorisMiddleweare";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { postsController } from "../controller/postsController";
import { postTitleValidation, postShortDescriptionValidation, postContentValidation } from "../validators/postsValidations";
import { isValidIdObjectFromBody, isValidObjectId } from "../../../validators/paramsIdValidation";
export const postsRouter = Router()


postsRouter.get('/',postsController.getAllPosts)
postsRouter.post('/',authMiddleware,isValidIdObjectFromBody,postTitleValidation,postShortDescriptionValidation,postContentValidation, inputCheckErrorsMiddleware,postsController.createPost)
postsRouter.get('/:id',isValidObjectId,inputCheckErrorsMiddleware,postsController.getPostById)
postsRouter.put('/:id',authMiddleware,isValidObjectId,isValidIdObjectFromBody,postTitleValidation,postShortDescriptionValidation,postContentValidation,inputCheckErrorsMiddleware, postsController.updatePostById)
postsRouter.delete('/:id',authMiddleware,postsController.deletPostById)