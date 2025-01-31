import { ObjectId } from "mongodb";
import { usersCollection } from "../../../db/mongo-db";
import { UserViewModelWith_id } from "../models/UserViewModel";
import { EmailConfirmation, UserDBModelWithCongirmation } from "../../usersAuthorisation/models/UserRegistrationConfimationModel";



export const usersRepository = {
   async create(user: any):Promise<string>{
      
      const createdUserId = await usersCollection.insertOne(user)
      return createdUserId.insertedId.toString()
   },
   async delete(userId:ObjectId):Promise< boolean>{
      const deletedUser = await usersCollection.deleteOne({'_id':userId})
      return deletedUser.deletedCount === 1
   },
   async findUserByEmailOrLogin(emailOrLogin:string){
      const existingUserEmailOrLogin = await usersCollection.findOne({ $or: [ { 'email': emailOrLogin }, { 'login': emailOrLogin} ] })
      return existingUserEmailOrLogin as any
   },
   async findUserById(userId:ObjectId){
      const existingUser = await usersCollection.findOne({'_id':userId })
      return existingUser
   },
   async updateSomeDataValueUser(filter:any, field: string, value: any){
      // using filter for find some document, field wich have to be udate, value wich need renew
      const update = { [field]: value };
      const findAndUpdateUser = await usersCollection.findOneAndUpdate(filter,{$set:update},{ returnDocument: 'after' })
      return findAndUpdateUser
   },
   async findUserWithEmailConfirmation(filter:any){
      const findUserResult = await usersCollection.findOne(filter)
      return findUserResult
   }
}