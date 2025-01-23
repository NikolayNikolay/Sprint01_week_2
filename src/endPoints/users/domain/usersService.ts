import { ObjectId } from "mongodb";
import { UserInputModel } from "../models/UserInputModel";
import { usersRepository } from "../queryRepository/usersRepository";
import bcrypt, { compare } from 'bcrypt';
import { LoginInputModelType } from "../../usersAuthorisation/models/LoginInputModel";

export const usersCervice = {
   async createUser (reqBody:UserInputModel):Promise<any>{
      const isUniqueEmail = await usersRepository.findUserByEmailOrLogin(reqBody.email)
      if (isUniqueEmail ) {
         return {
            "errorsMessages": [
              {
               "message": "Existed Email",
               "field": "email"
              }
            ]
          }
      }
      const isUniqueLogin = await usersRepository.findUserByEmailOrLogin(reqBody.login)
      if (isUniqueLogin ) {
         return {
            "errorsMessages": [
              {
               "message": "Existed Login",
               "field": "login"
              }
            ]
          }
      }
      //create Hash Password
      const user = {
         ...reqBody,
         password: await this._createHashPassword(reqBody.password),
         createdAt: new Date().toISOString()
      }
      const createUserId = await usersRepository.create(user)
      
      return createUserId
   },
   async deletUser(userId:string):Promise<boolean>{
      const deletedUser = await usersRepository.delete(new ObjectId(userId))
      return deletedUser
   },
   // create Hash Password
   async _createHashPassword(password:string){
      const saltRounds = 10
      return await bcrypt.hash(password,saltRounds)
   },
   async _comparePassword (password:string, storedHash:string):Promise<boolean>{
      // const  hashedPassword = await this._createHashPassword(password)

      return await bcrypt.compare(password , storedHash)
   },
}