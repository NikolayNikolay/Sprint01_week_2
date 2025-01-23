"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultStatus = void 0;
var ResultStatus;
(function (ResultStatus) {
    ResultStatus["Success"] = "Success";
    ResultStatus["SuccessNoContent"] = "SuccessNoContent";
    ResultStatus["NotFound"] = "NotFound";
    ResultStatus["Forbidden"] = "Forbidden";
    ResultStatus["Unathorized"] = "Unathorized";
    ResultStatus["BadRequest"] = "BadRequest";
    ResultStatus["Created"] = "Created";
})(ResultStatus || (exports.ResultStatus = ResultStatus = {}));
