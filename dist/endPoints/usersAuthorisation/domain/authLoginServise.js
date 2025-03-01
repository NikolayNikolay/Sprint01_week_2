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
const usersRepository_1 = require("../../users/repository/usersRepository");
const resultResponsObject_1 = require("../../../helpers/resultResponsObject");
const resultStatus_1 = require("../../../enums/resultStatus");
const mongodb_1 = require("mongodb");
const emailServise_1 = require("../emailDomain/emailServise");
const crypto_1 = require("crypto");
const add_1 = require("date-fns/add");
const isBefore_1 = require("date-fns/isBefore");
const jwtServises_1 = require("../applications/jwtServises");
class AuthUserService {
    authorizationCheck(authData, ip, device_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(authData.loginOrEmail);
            if (!user) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] });
            }
            const checkPssword = yield usersService_1.usersService._comparePassword(authData.password, user.password);
            if (!checkPssword) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] });
            }
            if (!user.emailConfirmation.isConfirmed) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'Email not confirmed', field: 'emailConfirmati' }] });
            }
            // add logic session users with diferent units
            let sessionData = {
                ip,
                device_name,
                deviceId: (0, crypto_1.randomUUID)(),
                user_id: user._id.toString(),
            };
            const tokens = jwtServises_1.jwtServise.generateJwtTokens(user, sessionData);
            const decodedAndTakeIssueAtandExp = jwtServises_1.jwtServise.decodingJwt(tokens.refreshToken);
            sessionData = Object.assign({}, decodedAndTakeIssueAtandExp); // decoded data has what need to add in sessionDevice
            const addSessionData = yield usersRepository_1.usersRepository.pushOrAddSomeDataValueUser({ '_id': new mongodb_1.ObjectId(user._id) }, 'sessionDevice', sessionData);
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Success, 'Success', tokens);
        });
    }
    //
    registerUser(regisData) {
        return __awaiter(this, void 0, void 0, function* () {
            const unickEmail = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(regisData.email);
            if (unickEmail)
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad request', null, { errorsMessages: [{ message: 'Existed Email', field: 'email' }] });
            const unickLogin = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(regisData.login);
            if (unickLogin)
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad request', null, { errorsMessages: [{ message: 'Existed Login', field: 'login' }] });
            const newUser = Object.assign(Object.assign({}, regisData), { password: yield usersService_1.usersService._createHashPassword(regisData.password), createdAt: new Date().toISOString(), emailConfirmation: {
                    confirmationCode: (0, crypto_1.randomUUID)(),
                    expirationDate: (0, add_1.add)(new Date(), {
                        // hours: 1,
                        minutes: 30,
                    }),
                    isConfirmed: false
                }, sessionDevice: [], passwordRecovery: [] });
            const createUserId = yield usersRepository_1.usersRepository.create(newUser);
            if (!createUserId) {
                //500 err
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request');
            }
            // if user created and is found, will send email confirmation.
            try {
                emailServise_1.emailServise.sendEmailForRegistration(regisData.email, newUser.emailConfirmation.confirmationCode);
            }
            catch (err) {
                console.error(err);
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
    confirmationUser(uuIdCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuIdCode.code) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not code in body", field: "code" }] });
            }
            const getUserByConfirmCode = yield usersRepository_1.usersRepository.findUserWithAnyInformation({ 'emailConfirmation.confirmationCode': uuIdCode.code });
            // check is existing user by uuId 
            if (!getUserByConfirmCode) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not found", field: "code" }] });
            }
            //check is alredy confirmed
            if (getUserByConfirmCode.emailConfirmation.isConfirmed) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "is alredy confirmed", field: "code" }] });
            }
            // check experation date, must be last in the list
            const checkExpirationDate = (0, isBefore_1.isBefore)(getUserByConfirmCode.emailConfirmation.expirationDate, new Date());
            if (!checkExpirationDate) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Expired", field: "code" }] });
            }
            // update confirm field
            const updateConfirmation = yield usersRepository_1.usersRepository.updateSomeDataValueUser({ '_id': new mongodb_1.ObjectId(getUserByConfirmCode._id) }, 'emailConfirmation.isConfirmed', true);
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
    emailResendingForConfirmation(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userEmail.email) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not email in body", field: "email" }] });
            }
            const getUser = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(userEmail.email);
            if (!getUser) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not found user", field: "email" }] });
            }
            if (getUser.emailConfirmation.isConfirmed) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "alredy confirmed", field: "email" }] });
            }
            try {
                emailServise_1.emailServise.sendEmailForRegistration(userEmail.email, getUser.emailConfirmation.confirmationCode);
            }
            catch (err) {
                console.error(err);
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
    userRefreshToken(user, deviceName, ipAddres) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield usersRepository_1.usersRepository.findUserById(new mongodb_1.ObjectId(user.user_id));
            if (!checkUser) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid id', field: 'id' }] });
            }
            // check iat from token in user field sessionDevice
            const isValidToken = checkUser.sessionDevice.find((session) => session.iat === user.iat && session.deviceId === user.deviceId);
            if (!isValidToken) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid token', field: 'token' }] });
            }
            const newPaerTokens = jwtServises_1.jwtServise.generateJwtTokens(checkUser, isValidToken);
            if (!newPaerTokens.accessToken && !newPaerTokens.refreshToken) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.ServerError, '500', null, { errorsMessages: [{ message: 'can not create', field: 'token' }] });
            }
            // after created new tokens decod refresh and update session iat and exp
            const decodedSessionData = jwtServises_1.jwtServise.decodingJwt(newPaerTokens.refreshToken);
            if (!decodedSessionData) {
                throw new Error('decode is null');
            }
            const renewToken = yield usersRepository_1.usersRepository.updateSessionDeviceInformation({ '_id': new mongodb_1.ObjectId(user.user_id) }, decodedSessionData);
            if (!renewToken) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.ServerError, '500', null, { errorsMessages: [{ message: 'some server error', field: 'token' }] });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Success, 'Success', newPaerTokens);
        });
    }
    userLogOut(userSessionDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield usersRepository_1.usersRepository.findUserById(new mongodb_1.ObjectId(userSessionDevice.user_id));
            if (!checkUser) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid id', field: 'id' }] });
            }
            const isValidToken = checkUser.sessionDevice.find((session) => session.iat === userSessionDevice.iat && session.deviceId === userSessionDevice.deviceId);
            if (!isValidToken) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid token', field: 'token' }] });
            }
            const removeSession = yield usersRepository_1.usersRepository.removeSomeData({ '_id': new mongodb_1.ObjectId(checkUser._id) }, { sessionDevice: { deviceId: userSessionDevice.deviceId } });
            const checkUser2 = yield usersRepository_1.usersRepository.findUserById(new mongodb_1.ObjectId(userSessionDevice.user_id));
            if (!removeSession) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.ServerError, '500', null, { errorsMessages: [{ message: 'some server error', field: 'token' }] });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
    passwordRecovery(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(userEmail);
            const recoveryPassword = {
                recoveryCode: (0, crypto_1.randomUUID)(),
                expirationDate: (0, add_1.add)(new Date(), {
                    // hours: 1,
                    minutes: 30,
                }),
                isConfirmed: false
            };
            const addRecoverCodeResult = yield usersRepository_1.usersRepository.pushOrAddSomeDataValueUser({ 'email': userEmail }, 'passwordRecovery', recoveryPassword);
            console.log('passwordRecovery      ', addRecoverCodeResult);
            try {
                emailServise_1.emailServise.sendEmailForRegistration(userEmail, recoveryPassword.recoveryCode);
            }
            catch (err) {
                console.error(err);
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
    newPassword(confirmData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersRepository_1.usersRepository.findUserWithAnyInformation({ 'recoveryCode': confirmData.recoveryCode });
            if (!user) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] });
            }
            const checkRecoveryCode = user.passwordRecovery.find((code) => code.recoveryCode === confirmData.recoveryCode);
            if (!(checkRecoveryCode === null || checkRecoveryCode === void 0 ? void 0 : checkRecoveryCode.isConfirmed)) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] });
            }
            const checkExpirationDate = (0, isBefore_1.isBefore)(checkRecoveryCode.expirationDate, new Date());
            if (checkExpirationDate) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { errorsMessages: [{ message: 'invalid', field: 'recoveryCode' }] });
            }
            const createNewPassword = yield usersService_1.usersService._createHashPassword(confirmData.newPassword);
            const updateInfoAboutCode = yield usersRepository_1.usersRepository.updateSomeDataValueUser({ '_id': user._id }, 'password', createNewPassword);
            console.log('create new password   ', user, updateInfoAboutCode);
            const updateConfirmRecoverCode = yield usersRepository_1.usersRepository.updateSomeObjInArray({ '_id': user._id, 'passwordRecovery.recoveryCode': confirmData.recoveryCode }, true);
            console.log('after updateConfirmRecoverCode     ', updateConfirmRecoverCode);
            if (!updateInfoAboutCode || !updateConfirmRecoverCode) {
                //todo: finich logic update new password
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.ServerError, 'Server Error', null, { errorsMessages: [{ message: 'some error with server', field: 'server' }] });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content', null);
        });
    }
}
exports.authUserService = new AuthUserService();
