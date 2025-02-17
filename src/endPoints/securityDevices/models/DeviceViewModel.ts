import { ObjectId } from "mongodb"

export type DeviceViewModel = {
   ip:string
   title:string
   lastActiveDate:string
   deviceId:string
}

export type DeviceDbModel = {
   ip:string
   device_name:string
   device_id:string
   user_id: string
   iat: Date
   exp:Date
}
