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
exports.authRefreshToken = exports.authenticateUser = void 0;
const jwtServises_1 = require("../applications/jwtServises");
const settings_1 = require("../../../settings");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accsessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accsessToken) {
            req.user = null;
            return res.send(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        }
        // Decode the token
        const decodedTokens = jwtServises_1.jwtServise.checkJwtTokensUser(accsessToken);
        req.user = Object.assign({ user_id: decodedTokens === null || decodedTokens === void 0 ? void 0 : decodedTokens.user_id }, decodedTokens); // Populate `req.user`
        next();
        return;
    }
    catch (error) {
        req.user = null;
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        return;
    }
});
exports.authenticateUser = authenticateUser;
const authRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log('inside midleware      ',req.headers.cookie);
        const refreshToken = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')[1].split(";")[0];
        // console.log('inside midleware      ', refreshToken);
        if (!refreshToken) {
            req.user = null;
            return res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        }
        // Decode the token
        const decodedTokens = jwtServises_1.jwtServise.checkJwtTokensUser(refreshToken);
        // console.log('decoded refrech token  ', decodedTokens);
        req.user = Object.assign({ user_id: decodedTokens === null || decodedTokens === void 0 ? void 0 : decodedTokens.user_id }, decodedTokens); // Populate `req.user`
        next();
        return;
    }
    catch (error) {
        console.log(error);
        req.user = null;
        res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        return;
    }
});
exports.authRefreshToken = authRefreshToken;
