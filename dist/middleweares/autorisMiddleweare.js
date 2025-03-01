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
exports.authMiddleware = void 0;
const settings_1 = require("../settings");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        console.log('No Authorization header');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        return;
    }
    if (!authorizationHeader.startsWith('Basic ')) {
        console.log('Authorization header is not Basic');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        return;
    }
    const encodedAuth = authorizationHeader.slice(6); // Extract the base64 part
    const expectedAuth = Buffer.from(settings_1.ADMIN_AUTH, 'utf8').toString('base64');
    if (encodedAuth !== expectedAuth) {
        console.log('Invalid credentials');
        res.send(settings_1.httpStatusCodes.UNAUTHORIZED_401);
        return;
    }
    next(); // Proceed to the next middleware or route handler
});
exports.authMiddleware = authMiddleware;
