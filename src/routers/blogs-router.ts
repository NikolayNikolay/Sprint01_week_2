import { Router} from "express";
import { createBlogController,getAllBlogController,getByIdController, updateByIdController, deletByIdController } from "../controllers/blogsController/blogsController";
import { authMiddleware } from "../middleweares/autorisMiddleweare";
import { middlewareValidationArray,inputCheckErrorsMiddleware} from "../validators/blogsValidatotion";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogController)
blogsRouter.post('/',authMiddleware,...middlewareValidationArray,inputCheckErrorsMiddleware, createBlogController)
blogsRouter.get('/:id', getByIdController)
blogsRouter.put('/:id',authMiddleware,...middlewareValidationArray,inputCheckErrorsMiddleware,updateByIdController)
blogsRouter.delete('/:id', deletByIdController)