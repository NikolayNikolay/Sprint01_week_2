import { ObjectId } from "mongodb";
import { usersCollection } from "../../../db/mongo-db";



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
      const existinguserEmailOrLogin = await usersCollection.findOne({ $or: [ { 'email': emailOrLogin }, { 'login': emailOrLogin} ] })
      return existinguserEmailOrLogin as any
   }
}