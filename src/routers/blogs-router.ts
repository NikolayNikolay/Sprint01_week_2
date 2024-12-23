import { Router} from "express";
import { createBlogController,getAllBlogController,getByIdController, updateByIdController, deletByIdController } from "../controllers/blogsController/blogsController";
import { authMiddleware } from "../middleweares/autorisMiddleweare";
import { inputCheckErrorsMiddleware, blogsWebsiteUrlValidation, blogsDescriptionValidation , blogsNameValidation,} from "../validators/blogsValidatotion";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogController)
blogsRouter.post('/',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', getByIdController)
blogsRouter.put('/:id',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware,updateByIdController)
blogsRouter.delete('/:id',authMiddleware, deletByIdController)