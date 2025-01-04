import { authMiddleware } from "../middleweares/autorisMiddleweare"
import {postBlogIdValidation,postTitleValidation,postShortDescriptionValidation,postContentValidation} from '../validators/postsValidations'
import { inputCheckErrorsMiddleware } from "../middleweares/imputCheckErrorsMiddleware"
import { postsController } from "../controllers/postConrtoller/postsController"
import { blogPostsController } from "../controllers/blog-post-Controller/blog-post-controller"
import { Request, Response, Router } from "express"
import { blogPostsUriParamsId } from '../middleweares/queryParamsMiddleweare'
import { blogPostsUriParamsIsId } from "../validators/blogsValidatotion"

export const blogPostRouter = Router()

blogPostRouter.post('/:id/posts',authMiddleware,postTitleValidation,postShortDescriptionValidation,postContentValidation,inputCheckErrorsMiddleware, postsController.createPost )
blogPostRouter.get('/:id/posts', blogPostsUriParamsId,blogPostsController.getAllPostsForBlog)