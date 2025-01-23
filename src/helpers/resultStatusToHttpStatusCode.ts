import { ResultStatus } from "../enums/resultStatus";
import { httpStatusCodes } from "../settings";



export const resultStatusToHttpStatusCode = (resultCode:string): number=>{
   switch (resultCode) {
      case ResultStatus.Success:
        return httpStatusCodes.OK_200;
        case ResultStatus.SuccessNoContent:
        return httpStatusCodes.NO_CONTENT_204;
        case ResultStatus.Unathorized:
         return httpStatusCodes.UNAUTHORIZED_401;
         case ResultStatus.NotFound:
         return httpStatusCodes.NOT_FOUND_404;
         case ResultStatus.BadRequest:
         return httpStatusCodes.BAD_REQUEST_400;
         case ResultStatus.Forbidden:
         return httpStatusCodes.FORBIDDEN_403;
         case ResultStatus.Created:
         return httpStatusCodes.CREATED_201;
      default:
         return 500;
   }
}