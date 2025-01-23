"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginController = void 0;
const settings_1 = require("../../../settings");
const authLoginServise_1 = require("../domain/authLoginServise");
const resultStatus_1 = require("../../../enums/resultStatus");
const resultStatusToHttpStatusCode_1 = require("../../../helpers/resultStatusToHttpStatusCode");
const jwtServises_1 = require("../applications/jwtServises");
exports.authLoginController = {
    authLoginPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = yield authLoginServise_1.authUserService.authorizationCheck(req.body);
            if (authUser.status === resultStatus_1.ResultStatus.Unathorized) {
                res.sendStatus((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(authUser.status));
                return;
            }
            const token = yield jwtServises_1.jwtServise.generateJwtToken(authUser.data);
            res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(authUser.status)).send(token);
        });
    },
    getInformationOfMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                res.status(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            res.status(settings_1.httpStatusCodes.OK_200).send(req.user);
        });
    }
};
