import { ResultStatus } from "../enums/resultStatus"
import { errorsMessagesType, FieldErrorType } from "./errorsMessagesType"

export type ResponseObjectType<ViewModel = null> = {
  status: string,
  message: string,
  data: ViewModel,
  errors?: errorsMessagesType
}