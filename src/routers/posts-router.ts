import { Router} from "express";
import { authMiddleware } from "../middleweares/autorisMiddleweare";
import { postsController } from "../controllers/postConrtoller/postsController";
import { inputCheckErrorsMiddleware } from "../middleweares/imputCheckErrorsMiddleware";
import {postBlogIdValidation,postTitleValidation,postShortDescriptionValidation,postContentValidation} from '../validators/postsValidations'
export const postsRouter = Router()


postsRouter.get('/',postsController.getAllPosts)
postsRouter.post('/',authMiddleware,postBlogIdValidation,postTitleValidation,postShortDescriptionValidation,postContentValidation, inputCheckErrorsMiddleware,postsController.createPost)
postsRouter.get('/:id',postsController.getPostById)
postsRouter.put('/:id',authMiddleware,postBlogIdValidation,postTitleValidation,postShortDescriptionValidation,postContentValidation,inputCheckErrorsMiddleware, postsController.updatePostById)
postsRouter.delete('/:id',authMiddleware,postsController.deletPostById)