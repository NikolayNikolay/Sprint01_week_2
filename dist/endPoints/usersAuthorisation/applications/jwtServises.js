"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtServise = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../../../settings");
const convertSecretForJwt = Buffer.from(settings_1.SETTINGS.SECRET_KEY).toString('base64');
exports.jwtServise = {
    generateJwtTokens(user, sessionData) {
        const jwtAccess = jsonwebtoken_1.default.sign({ user_id: user._id.toString() }, convertSecretForJwt, { expiresIn: '10s' });
        const jwtRefresh = jsonwebtoken_1.default.sign({ user_id: user._id.toString(), iat: Math.floor(Date.now() / 1000), ip: sessionData === null || sessionData === void 0 ? void 0 : sessionData.ip,
            device_name: sessionData === null || sessionData === void 0 ? void 0 : sessionData.device_name,
            device_id: sessionData === null || sessionData === void 0 ? void 0 : sessionData.device_id }, convertSecretForJwt, { expiresIn: '10s' });
        return {
            accessToken: jwtAccess,
            refreshToken: jwtRefresh
        };
    },
    checkJwtTokensUser(token) {
        try {
            const result = jsonwebtoken_1.default.verify(token, convertSecretForJwt);
            if (!result || typeof result !== "object" || !result.user_id) {
                return null;
            }
            return {
                ip: result.ip ? result.ip : null,
                device_name: result.device_name ? result.device_name : null,
                device_id: result.device_id ? result.device_id : null,
                user_id: result.user_id,
                iat: result.iat,
                exp: result.exp,
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },
    decodingJwt(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded)
            return null; // Handle invalid tokens
        return decoded;
    }
};
