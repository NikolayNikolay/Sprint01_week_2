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
const mongodb_1 = require("mongodb");
const queryUsersRepository_1 = require("../../users/queryRepository/queryUsersRepository");
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.authLoginController = {
    authLoginPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const ipUser = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
            const deviceName = req.headers['user-agent'];
            console.log(ipUser, deviceName);
            const authUser = yield authLoginServise_1.authUserService.authorizationCheck(req.body, ipUser.toString(), deviceName);
            if (authUser.status === resultStatus_1.ResultStatus.Unathorized) {
                res.sendStatus((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(authUser.status));
                return;
            }
            res.cookie('refreshToken', (_a = authUser.data) === null || _a === void 0 ? void 0 : _a.refreshToken, { httpOnly: true, secure: true, });
            res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(authUser.status)).send({ accessToken: (_b = authUser.data) === null || _b === void 0 ? void 0 : _b.accessToken });
        });
    },
    getInformationOfMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            const infoUser = yield queryUsersRepository_1.queryUsersRepository.getInformationOfMe(new mongodb_1.ObjectId(req.user.user_id));
            if (!infoUser) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            res.status(settings_1.httpStatusCodes.OK_200).send(infoUser);
        });
    },
    rigistrationUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const resultRegistration = yield authLoginServise_1.authUserService.registerUser(req.body);
            if ((_a = resultRegistration.errors) === null || _a === void 0 ? void 0 : _a.errorsMessages.length) {
                res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(resultRegistration.status)).send(resultRegistration.errors);
                return;
            }
            res.send((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(resultRegistration.status));
        });
    },
    registrationConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const confirmationResult = yield authLoginServise_1.authUserService.confirmationUser(req.body);
            if ((_a = confirmationResult.errors) === null || _a === void 0 ? void 0 : _a.errorsMessages.length) {
                res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(confirmationResult.status)).send(confirmationResult.errors);
                return;
            }
            res.send((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(confirmationResult.status));
        });
    },
    resendingEmailForConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const resendingEmailResult = yield authLoginServise_1.authUserService.emailResendingForConfirmation(req.body);
            if ((_a = resendingEmailResult.errors) === null || _a === void 0 ? void 0 : _a.errorsMessages.length) {
                res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(resendingEmailResult.status)).send(resendingEmailResult.errors);
                return;
            }
            res.sendStatus((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(resendingEmailResult.status));
        });
    },
    userRefreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const deviceName = req.headers['user-agent'];
            const ipUser = req.headers["x-forwarded-for"] || req.ip || req.connection.remoteAddress;
            if (!req.user) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            const refreshResult = yield authLoginServise_1.authUserService.userRefreshToken(req.user, deviceName, ipUser);
            if (!refreshResult) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            res.cookie('refreshToken', (_a = refreshResult.data) === null || _a === void 0 ? void 0 : _a.refreshToken, { httpOnly: true, secure: true, });
            res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(refreshResult.status)).send({ accessToken: (_b = refreshResult.data) === null || _b === void 0 ? void 0 : _b.accessToken });
        });
    },
    userLogOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
                return;
            }
            const userLogOutResult = yield authLoginServise_1.authUserService.userLogOut(req.user.user_id, req.user.device_id);
            res.clearCookie('refreshToken');
            res.sendStatus((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(userLogOutResult.status));
        });
    }
};
