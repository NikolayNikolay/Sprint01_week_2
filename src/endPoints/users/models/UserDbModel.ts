import { ObjectId } from "mongodb"
import { EmailConfirmation } from "../../usersAuthorisation/models/UserRegistrationConfimationModel"
import { DeviceDbModel, DeviceViewModel} from "../../securityDevices/models/DeviceViewModel"

export type UserDbModel = {
      _id: ObjectId
      login: string
      email: string
      createdAt: string
      password: string
      emailConfirmation:EmailConfirmation
      sessionDevice: DeviceDbModel[]
}