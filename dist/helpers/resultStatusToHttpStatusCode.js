"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultStatusToHttpStatusCode = void 0;
const resultStatus_1 = require("../enums/resultStatus");
const settings_1 = require("../settings");
const resultStatusToHttpStatusCode = (resultCode) => {
    switch (resultCode) {
        case resultStatus_1.ResultStatus.Success:
            return settings_1.httpStatusCodes.OK_200;
        case resultStatus_1.ResultStatus.SuccessNoContent:
            return settings_1.httpStatusCodes.NO_CONTENT_204;
        case resultStatus_1.ResultStatus.Unathorized:
            return settings_1.httpStatusCodes.UNAUTHORIZED_401;
        case resultStatus_1.ResultStatus.NotFound:
            return settings_1.httpStatusCodes.NOT_FOUND_404;
        case resultStatus_1.ResultStatus.BadRequest:
            return settings_1.httpStatusCodes.BAD_REQUEST_400;
        case resultStatus_1.ResultStatus.Forbidden:
            return settings_1.httpStatusCodes.FORBIDDEN_403;
        case resultStatus_1.ResultStatus.Created:
            return settings_1.httpStatusCodes.CREATED_201;
        default:
            return 500;
    }
};
exports.resultStatusToHttpStatusCode = resultStatusToHttpStatusCode;
