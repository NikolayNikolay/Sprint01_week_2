import { ObjectId, UpdateFilter } from "mongodb";
import { usersCollection } from "../../../db/mongo-db";
import { EmailConfirmation, UserDBModelWithCongirmation } from "../../usersAuthorisation/models/UserRegistrationConfimationModel";
import { PasswordRecoveryDbModel, UserDbModel } from "../models/UserDbModel";
import { DeviceDbModel } from "../../securityDevices/models/DeviceViewModel";



export const usersRepository = {
   async create(user: any):Promise<string>{
      
      const createdUserId = await usersCollection.insertOne(user)
      return createdUserId.insertedId.toString()
   },
   async delete(userId:ObjectId):Promise<boolean>{
      const deletedUser = await usersCollection.deleteOne({'_id':userId})
      return deletedUser.deletedCount === 1
   },
   async findUserByEmailOrLogin(emailOrLogin:string):Promise<UserDbModel | null>{
      const existingUserEmailOrLogin = await usersCollection.findOne({ $or: [ { 'email': emailOrLogin }, { 'login': emailOrLogin} ] })
      return existingUserEmailOrLogin
   },
   async findUserById(userId:ObjectId):Promise<UserDbModel | null>{
      const existingUser = await usersCollection.findOne({'_id':userId })
      return existingUser
   },
   async updateSomeDataValueUser(filter:any, field: string, value: string | number | boolean):Promise<UserDbModel | null>{
      // using filter for find some document, field wich have to be udate, value wich need renew
      const update = { [field]: value };
      const findAndUpdateUser = await usersCollection.findOneAndUpdate(filter,{$set:update},{ returnDocument: 'after' })
      return findAndUpdateUser
   },
   async pushOrAddSomeDataValueUser(filter:any, field: string, value: string | number | boolean | DeviceDbModel | PasswordRecoveryDbModel):Promise<UserDbModel | null>{
      // using filter for find some document, field wich have to be udate, value wich need renew
      const update = { [field]: value };
      const findAndPushDataUser = await usersCollection.findOneAndUpdate(filter,{$push:update},{ returnDocument: 'after' })
      return findAndPushDataUser
   },
   async findUserWithAnyInformation(filter:any):Promise<UserDbModel | null>{
      const findUserResult = await usersCollection.findOne(filter)
      return findUserResult
   },
   // update or delete session information
   async updateSessionDeviceInformation (filter:any,sessionInfo:DeviceDbModel){
      
      const updateResult = await usersCollection.findOneAndUpdate(filter,{
         $set: {
             'sessionDevice.$[device].iat': sessionInfo.iat,
             'sessionDevice.$[device].exp': sessionInfo.exp
         }
     },
     {
         arrayFilters: [{ 'device.deviceId': sessionInfo.deviceId }],
         returnDocument: 'after'
     })
       return updateResult
   },
   async removeSomeData(filter:any, field:string|number|boolean|any):Promise<UserDbModel | null>{
      const removeResult = await usersCollection.findOneAndUpdate(filter,{$pull:field},{ returnDocument: "after" })
      return removeResult
   },
   async deleteAllSessionDevice(filter:any,data:DeviceDbModel):Promise<UserDbModel | null>{
      const result = await usersCollection.findOneAndUpdate(filter,{$set:{sessionDevice:[data]}},{returnDocument:'after'})
      return result
   },
   async findUserByDeviceId(deviceId:string):Promise<UserDbModel | null>{
      const result = await usersCollection.findOne({
         sessionDevice: {
           $elemMatch: { deviceId: deviceId }
         }
       })
      return result 
   },
   async updateSomeObjInArray(filter:any, value: string|boolean):Promise<UserDbModel | null>{
      const updatedResult = await usersCollection.findOneAndUpdate(
         filter, 
         { $set: { "passwordRecovery.$.isConfirmed": value } }, 
         {returnDocument: 'after'} // Returns the updated document
       );
       return updatedResult
   }
}