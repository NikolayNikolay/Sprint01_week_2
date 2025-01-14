import { authMiddleware } from "../../../middleweares/autorisMiddleweare"
import {postTitleValidation,postShortDescriptionValidation,postContentValidation} from '../../posts/validators/postsValidations'
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware"
import { postsController } from "../../posts/controller/postsController"
import { blogPostsController } from "../controller/blog-post-controller"
import { Request, Response, Router } from "express"
import { blogPostsUriParamsId } from '../../../middleweares/queryParamsMiddleweare'
import { isValidObjectId } from "../../../validators/paramsIdValidation"


export const blogPostRouter = Router()

blogPostRouter.post('/:id/posts',authMiddleware,isValidObjectId,postTitleValidation,postShortDescriptionValidation,postContentValidation,inputCheckErrorsMiddleware, blogPostsController.createPostForBlog )
blogPostRouter.get('/:id/posts', isValidObjectId,inputCheckErrorsMiddleware,blogPostsController.getAllPostsForBlog)