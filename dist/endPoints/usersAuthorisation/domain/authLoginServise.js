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
exports.authUserService = {
    authorizationCheck(authData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(authData.loginOrEmail);
            if (!user) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] });
            }
            const checkPssword = yield usersService_1.usersService._comparePassword(authData.password, user.password);
            if (!checkPssword) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Unathorized, 'Unathorized', null, { errorsMessages: [{ message: 'invalid Password or Email', field: 'Password or Email' }] });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Success, 'Success', user);
        });
    },
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
                        minutes: 1,
                    }),
                    isConfirmed: false
                } });
            const createUserId = yield usersRepository_1.usersRepository.create(newUser);
            if (!createUserId) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request');
            }
            // if user created and is found, will send email confirmation.
            try {
                yield emailServise_1.emailServise.sendEmail(regisData.email, newUser.emailConfirmation.confirmationCode);
            }
            catch (err) {
                console.error(err);
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    },
    confirmationUser(uuIdCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuIdCode.code) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not code in body", field: "code" }] });
            }
            const getUserByConfirmCode = yield usersRepository_1.usersRepository.findUserWithEmailConfirmation({ 'emailConfirmation.confirmationCode': uuIdCode.code });
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
            if (checkExpirationDate) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Expired", field: "code" }] });
            }
            // update confirm field
            const updateConfirmation = yield usersRepository_1.usersRepository.updateSomeDataValueUser({ '_id': new mongodb_1.ObjectId(getUserByConfirmCode._id) }, 'emailConfirmation.isConfirmed', true);
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    },
    emailResendingForConfirmation(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userEmail.email) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not email in body", field: "email" }] });
            }
            const getUser = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(userEmail.email);
            console.log((getUser === null || getUser === void 0 ? void 0 : getUser.email) === userEmail.email);
            if (!getUser) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "Not found", field: "email" }] });
            }
            if (getUser.emailConfirmation.isConfirmed) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "alredy confirmed", field: "email" }] });
            }
            const confirmationCode = (0, crypto_1.randomUUID)();
            const renewConfirmCodeInUser = yield usersRepository_1.usersRepository.updateSomeDataValueUser({ '_id': getUser._id }, 'emailConfirmation.confirmationCode', confirmationCode);
            console.log(renewConfirmCodeInUser, getUser);
            try {
                yield emailServise_1.emailServise.sendEmail(userEmail.email, confirmationCode);
            }
            catch (err) {
                console.error(err);
            }
            console.log(renewConfirmCodeInUser.emailConfirmation.confirmationCode === getUser.emailConfirmation.confirmationCode);
            if (renewConfirmCodeInUser.emailConfirmation.confirmationCode === getUser.emailConfirmation.confirmationCode) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { errorsMessages: [{ message: "some wrong with code", field: "confirm code" }] });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'Success No Content');
        });
    }
};
