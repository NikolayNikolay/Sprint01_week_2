import { Request, Response } from "express";
import { securityService } from "../domain/securityService";
import { resultStatusToHttpStatusCode } from "../../../helpers/resultStatusToHttpStatusCode";
import { ResultStatus } from "../../../enums/resultStatus";


export const securityController ={
   async getInformationUserSessionDevices (req:Request,res:Response){
      const resultSessionDevices = await securityService.getInformationActivDevice(req.user)
      res.status(resultStatusToHttpStatusCode(resultSessionDevices.status)).send(resultSessionDevices.data)
      return
   },
   async deleteAllUserSessionsDevices(req:Request,res:Response){
      const resultRemoved = await securityService.deleteAllUserSessonsDevice(req.user)
      res.sendStatus(resultStatusToHttpStatusCode(resultRemoved.status))
   },
   async deleteOneSessionDeviceByDeviceId(req:Request,res:Response){
      if (!req.params.deviceId || !req.user) {
         res.sendStatus(resultStatusToHttpStatusCode(ResultStatus.Forbidden))
         return
      }
      const resultSessionDeviceDelete = await securityService.deleteOneSessionByDeviceId(req.user,req.params.deviceId)
      res.sendStatus(resultStatusToHttpStatusCode(resultSessionDeviceDelete.status))
   }
}