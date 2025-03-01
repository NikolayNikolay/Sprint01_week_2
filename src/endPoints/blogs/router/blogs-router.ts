import { Router} from "express";

import { blogsDescriptionValidation, blogsNameValidation, blogsWebsiteUrlValidation } from "../validators/blogsValidatotion";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { isValidObjectId } from "../../../validators/paramsIdValidation";
import { authMiddleware } from "../../../middleweares/autorisMiddleweare";
import { container } from "../../../composition-root";
import { BlogController } from "../controller/blogsController";


export const blogsRouter = Router()
const blogController:BlogController = container.get(BlogController)

blogsRouter.get('/', blogController.getAllBlogs.bind(blogController))
blogsRouter.post('/',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware, blogController.createBlog.bind(blogController))
blogsRouter.get('/:id',isValidObjectId,inputCheckErrorsMiddleware,blogController.getBlogById.bind(blogController))
blogsRouter.put('/:id',authMiddleware,isValidObjectId,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware,blogController.updateById.bind(blogController))
blogsRouter.delete('/:id',authMiddleware,isValidObjectId,inputCheckErrorsMiddleware, blogController.deletById.bind(blogController))