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
   deviceId:string
   user_id: string
   iat: number
   exp: number
}
