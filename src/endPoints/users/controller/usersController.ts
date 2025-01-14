import { Request,Response } from "express";
import { PaginationQueryUsersType } from "../models/UserViewModel";
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations";
import { queryUsersRepository } from "../queryRepository/queryUsersRepository";
import { mapViewUsersModel } from "../../../helpers/viewModelsMapMethod";
import { httpStatusCodes } from "../../../settings";
import { usersCervice } from "../domain/usersService";
import { ObjectId } from "mongodb";



export const usersController = {
   async getAllUsers(req:Request | any,res:Response){
      const users = await queryUsersRepository.getAllUsers(req.query)
      res.status(httpStatusCodes.OK).send(users)
   },
   async getUserById(req:Request,res:Response){
      
      const user = await queryUsersRepository.getUserById(new ObjectId(req.params.id))
      
      if (!user) {
         res.send(httpStatusCodes.NOT_FOUND)
         return
      }
      res.status(httpStatusCodes.OK).send(user)
   },
   async createUser(req:Request,res:Response){
      const userId = await usersCervice.createUser(req.body)
      if (typeof userId === 'string') {
         
         const getCreatedUser = await queryUsersRepository.getUserById(new ObjectId(userId))
         
         res.status(httpStatusCodes.CREATED).send(getCreatedUser)
      }
      else{
         res.status(httpStatusCodes.BAD_REQUEST).send(userId)
         return
      }
   },
   async deleteUser(req:Request,res:Response){
      const deletedUser = await usersCervice.deletUser(req.params.id)
      if (!deletedUser) {
         res.send(httpStatusCodes.NOT_FOUND)
         return
      }
      res.send(httpStatusCodes.NO_CONTENT)
   }
}