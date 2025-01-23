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
exports.authUserService = void 0;
const usersService_1 = require("../../users/domain/usersService");
const usersRepository_1 = require("../../users/queryRepository/usersRepository");
const resultResponsObject_1 = require("../../../helpers/resultResponsObject");
const resultStatus_1 = require("../../../enums/resultStatus");
exports.authUserService = {
    authorizationCheck(authData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(authData.loginOrEmail);
            if (!user) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { message: 'invalid Password or Email',
                    field: 'Password or Email' });
            }
            const checkPssword = yield usersService_1.usersCervice._comparePassword(authData.password, user.password);
            if (!checkPssword) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { message: 'invalid Password or Email',
                    field: 'Password or Email' });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Success, 'Success', user);
        });
    }
};
