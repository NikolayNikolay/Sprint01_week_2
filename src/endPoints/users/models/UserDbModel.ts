import { ObjectId } from "mongodb"
import { EmailConfirmation } from "../../usersAuthorisation/models/UserRegistrationConfimationModel"
import { DeviceDbModel} from "../../securityDevices/models/DeviceViewModel"
import { UUID } from "node:crypto"




export type PasswordRecoveryDbModel = {
      recoveryCode: UUID,
      expirationDate: Date,
      isConfirmed: boolean
}

export type UserDbModel = {
      _id: ObjectId
      login: string
      email: string
      createdAt: string
      password: string
      emailConfirmation:EmailConfirmation
      sessionDevice: DeviceDbModel[]
      passwordRecovery : PasswordRecoveryDbModel[]
}