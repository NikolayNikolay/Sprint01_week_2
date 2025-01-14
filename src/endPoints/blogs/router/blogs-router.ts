import { Router} from "express";
import { createBlogController, deletByIdController, getAllBlogController, getByIdController, updateByIdController } from "../controller/blogsController";
import { blogsDescriptionValidation, blogsNameValidation, blogsWebsiteUrlValidation } from "../validators/blogsValidatotion";
import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { isValidObjectId } from "../../../validators/paramsIdValidation";
import { authMiddleware } from "../../../middleweares/autorisMiddleweare";


export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogController)
blogsRouter.post('/',authMiddleware,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id',isValidObjectId,inputCheckErrorsMiddleware,getByIdController)
blogsRouter.put('/:id',authMiddleware,isValidObjectId,blogsDescriptionValidation,blogsNameValidation,blogsWebsiteUrlValidation,inputCheckErrorsMiddleware,updateByIdController)
blogsRouter.delete('/:id',authMiddleware,isValidObjectId,inputCheckErrorsMiddleware, deletByIdController)