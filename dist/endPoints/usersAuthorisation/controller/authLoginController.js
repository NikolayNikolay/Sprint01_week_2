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
const usersService_1 = require("../../users/domain/usersService");
const settings_1 = require("../../../settings");
exports.authLoginController = {
    authLoginPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = yield usersService_1.usersCervice.authorizationCheck(req.body);
            if (!auth) {
                res.sendStatus(settings_1.httpStatusCodes.UNAUTHORIZED);
                return;
            }
            res.sendStatus(settings_1.httpStatusCodes.NO_CONTENT);
        });
    }
};
