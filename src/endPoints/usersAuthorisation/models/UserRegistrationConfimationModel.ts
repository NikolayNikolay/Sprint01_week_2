import { UUID } from "crypto"
import { ObjectId } from "mongodb"
import { UserViewModel, UserViewModelWith_id } from "../../users/models/UserViewModel"

export type EmailConfirmation = {
      confirmationCode: UUID,
      expirationDate: Date,
      isConfirmed: boolean
}


export type UserDBModelWithCongirmation = {
   password: string
   emailConfirmation:EmailConfirmation
}