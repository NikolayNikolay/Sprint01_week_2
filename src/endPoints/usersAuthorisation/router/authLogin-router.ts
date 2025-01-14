import { Router } from "express";
import { SETTINGS } from "../../../settings";
import { authLoginController } from "../controller/authLoginController";


export const authLoginRouter = Router()


authLoginRouter.post('/',authLoginController.authLoginPost)