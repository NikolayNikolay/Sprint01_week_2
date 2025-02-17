import { ObjectId } from "mongodb";
import { usersCollection } from "../../../db/mongo-db";
import { SortDirections } from "../../../enums/SortDirections.enum";
import { QueryParamsType } from "../../../types/queryParams";
import { PaginationQueryParams } from "../../../helpers/queryParamsPaginations";
import { PaginationQueryUsersType } from "../models/UserViewModel";
import { mapMeViewModel, mapViewUsersModel } from "../../../helpers/viewModelsMapMethod";
import { filter } from "../../../helpers/serchFilter";
import { MeViewModel } from "../../usersAuthorisation/models/MeViewModel";


export const queryUsersRepository = {
   async getAllUsers(query:QueryParamsType):Promise<PaginationQueryUsersType>{
      //filter by some params
      const filterParams = filter(query)
      //get tottal quantity by some filter params
      const totalCount = await queryUsersRepository.totalCount(filterParams)
      //pagination by query request, if some query missing set defolt params
      const paginationForUsers =  PaginationQueryParams(query) 
      let users = await usersCollection
                .find(filterParams)
                .sort(paginationForUsers.sortBy, paginationForUsers.sortDirection as SortDirections)
                .skip((paginationForUsers.pageNumber - 1) * paginationForUsers.pageSize)
                .limit(paginationForUsers.pageSize)
                .toArray()
      users = mapViewUsersModel(users)
      return {
         pagesCount: Math.ceil(totalCount / paginationForUsers.pageSize),
         page: paginationForUsers.pageNumber,
         pageSize:paginationForUsers.pageSize ,
         totalCount: totalCount,
         items: users
      }
   },
   async getUserById(idUser:ObjectId){
      const user = await usersCollection.findOne({'_id':new ObjectId(idUser)})

      return user ? mapViewUsersModel(user) : user
   },
   async getInformationOfMe(idUser:ObjectId):Promise<MeViewModel | null>{
      const user = await usersCollection.findOne({'_id':new ObjectId(idUser)})
            
      return user ? mapMeViewModel(user) : user
   },
   async totalCount(params:any){
      const total = await usersCollection.countDocuments(params)
      return total
   }
}