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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtServise = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../../../settings");
exports.jwtServise = {
    generateJwtToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtToken = jsonwebtoken_1.default.sign({ userId: user._id.toString(), email: user.email,
                name: user.login }, settings_1.SETTINGS.SECRET_KEY, { expiresIn: '1h' });
            return {
                accessToken: jwtToken
            };
        });
    },
    checkJwtTokenUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.SECRET_KEY);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
};
