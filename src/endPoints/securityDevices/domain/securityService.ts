import { ObjectId } from "mongodb"
import { usersRepository } from "../../users/repository/usersRepository"
import { ResponseObjectType } from "../../../types/ResponseObjectType"
import { resultResponsObject } from "../../../helpers/resultResponsObject"
import { ResultStatus } from "../../../enums/resultStatus"
import { DeviceDbModel, DeviceViewModel } from "../models/DeviceViewModel"
import { mapViewDeviceModel } from "../../../helpers/viewModelsMapMethod"
import { log } from "console"




export const securityService = {
   async getInformationActivDevice(userSessionDevice:DeviceDbModel):Promise<ResponseObjectType<DeviceViewModel|null>>{
      const foundUser = await usersRepository.findUserById(new ObjectId(userSessionDevice.user_id))
      if (!foundUser) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const checkExistedSession = foundUser.sessionDevice.find((session:DeviceDbModel)=>session.iat === userSessionDevice.iat)
      console.log(checkExistedSession);
      
      if (!checkExistedSession) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const getAllUserDevices = mapViewDeviceModel(foundUser)
      
      return resultResponsObject(ResultStatus.Success,"Success",getAllUserDevices)
   },
   async deleteAllUserSessonsDevice(userSessionDevice:DeviceDbModel):Promise<ResponseObjectType<DeviceViewModel|null>>{
      const foundUser = await usersRepository.findUserById(new ObjectId(userSessionDevice.user_id))
      if (!foundUser) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const checkExistedSession = foundUser.sessionDevice.find((session:DeviceDbModel)=>session.iat === userSessionDevice.iat && session.device_id === userSessionDevice.device_id)
      if (!checkExistedSession) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const removeAllSessionsExceptCurent = await usersRepository.deleteAllSessionDevice({'_id':foundUser._id},checkExistedSession)
      console.log(removeAllSessionsExceptCurent);
      if (!removeAllSessionsExceptCurent) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      return resultResponsObject(ResultStatus.SuccessNoContent,"Success No Content",null)
   },
   async deleteOneSessionByDeviceId(userSessionDevice:DeviceDbModel, deviceId:string):Promise<ResponseObjectType<DeviceViewModel|null>>{
      const foundUser = await usersRepository.findUserById(new ObjectId(userSessionDevice.user_id))
      if (!foundUser) {
         return resultResponsObject(ResultStatus.NotFound,"Not Found",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      const foundUserByDeviceId = await usersRepository.findUserByDeviceId(deviceId)
      // if device id from endpoint incorect or from anather user = forbidden
      if (!foundUserByDeviceId || foundUser._id.toString() !== foundUserByDeviceId._id.toString()) {
         return resultResponsObject(ResultStatus.Forbidden,"Forbidden",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      // if do not exist device with good id = unatorized
      const checkExistedSession = foundUser.sessionDevice.find((session:DeviceDbModel)=>session.device_id === deviceId)
      if (!checkExistedSession) {
         return resultResponsObject(ResultStatus.NotFound,"NotFound",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }
      // if all good go to collecton and delete one sessoin device and return it
      const deleteExactlySessionDevice = await usersRepository.removeSomeData({'_id':new ObjectId(foundUser._id)},{sessionDevice:{device_id:deviceId}})
      if (!deleteExactlySessionDevice) {
         return resultResponsObject(ResultStatus.Unathorized,"Unathorized",null,{ errorsMessages: [{ message: 'invalid token', field: 'token' }] })
      }

      return resultResponsObject(ResultStatus.SuccessNoContent,"Success No Content",null)
   }
} 