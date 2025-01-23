import { LoginInputModelType } from "../../usersAuthorisation/models/LoginInputModel";
import { usersCervice } from "../../users/domain/usersService";
import { usersRepository } from "../../users/queryRepository/usersRepository";
import { resultResponsObject } from "../../../helpers/resultResponsObject";
import { ResultStatus } from "../../../enums/resultStatus";
import { ResponseObjectType } from "../../../types/ResponseObjectType";
import {UserViewModelWith_id } from "../../users/models/UserViewModel";

export const authUserService = {
   async authorizationCheck(authData:LoginInputModelType):Promise<ResponseObjectType<UserViewModelWith_id | null>>{
      const user = await usersRepository.findUserByEmailOrLogin(authData.loginOrEmail)
      if (!user) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{message: 'invalid Password or Email',
            field	: 'Password or Email'})
      }
      const checkPssword = await usersCervice._comparePassword(authData.password, user.password)
      if (!checkPssword) {
         return resultResponsObject(ResultStatus.Unathorized,'Unathorized',null,{message: 'invalid Password or Email',
            field	: 'Password or Email'})
      }
      return resultResponsObject(ResultStatus.Success,'Success',user)
   }
}