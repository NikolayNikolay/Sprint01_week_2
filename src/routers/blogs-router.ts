import { Router} from "express";
import { createBlogController,getAllBlogController,getByIdController, updateByIdController, deletByIdController } from "../controllers/blogsController/blogsController";
import { authMiddleware } from "../middleweares/autorisMiddleweare";
import { blogsWebsiteUrlValidation, blogsDescriptionValidation , blogsNameValidation,} from "../validators/blogsValidatotion";
import { inputCheckErrorsMiddleware } from "../middleweares/imputCheckErrorsMiddleware";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogController)
blogsRouter.post('/',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', getByIdController)
blogsRouter.put('/:id',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware,updateByIdController)
blogsRouter.delete('/:id',authMiddleware, deletByIdController)