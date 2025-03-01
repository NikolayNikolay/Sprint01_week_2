import { UUID } from "crypto"


export type EmailConfirmation = {
      confirmationCode: UUID,
      expirationDate: Date,
      isConfirmed: boolean
}


export type UserDBModelWithCongirmation = {
   password: string
   emailConfirmation:EmailConfirmation
}