import { Router } from "express";
import { securityController } from "../controller/securityController";
import { authRefreshToken } from "../../usersAuthorisation/midllewarers/authMidllewarer";




export const securityRouter = Router()


securityRouter.get('/devices',authRefreshToken,securityController.getInformationUserSessionDevices)
securityRouter.delete('/devices',authRefreshToken,securityController.deleteAllUserSessionsDevices)
securityRouter.delete('/devices/:deviceId',authRefreshToken,securityController.deleteOneSessionDeviceByDeviceId)
