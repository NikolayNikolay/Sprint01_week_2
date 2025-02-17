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
exports.usersService = void 0;
const mongodb_1 = require("mongodb");
const usersRepository_1 = require("../repository/usersRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
exports.usersService = {
    createUser(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUniqueEmail = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(reqBody.email);
            if (isUniqueEmail) {
                return {
                    "errorsMessages": [
                        {
                            "message": "Existed Email",
                            "field": "email"
                        }
                    ]
                };
            }
            const isUniqueLogin = yield usersRepository_1.usersRepository.findUserByEmailOrLogin(reqBody.login);
            if (isUniqueLogin) {
                return {
                    "errorsMessages": [
                        {
                            "message": "Existed Login",
                            "field": "login"
                        }
                    ]
                };
            }
            //create Hash Password
            const user = Object.assign(Object.assign({}, reqBody), { password: yield this._createHashPassword(reqBody.password), createdAt: new Date().toISOString(), emailConfirmation: {
                    confirmationCode: (0, crypto_1.randomUUID)(),
                    expirationDate: (0, date_fns_1.add)(new Date(), {
                        // hours: 1,
                        minutes: 30,
                    }),
                    isConfirmed: true
                }, sessionDevice: [] });
            const createUserId = yield usersRepository_1.usersRepository.create(user);
            return createUserId;
        });
    },
    deletUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield usersRepository_1.usersRepository.delete(new mongodb_1.ObjectId(userId));
            return deletedUser;
        });
    },
    // create Hash Password
    _createHashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return yield bcrypt_1.default.hash(password, saltRounds);
        });
    },
    _comparePassword(password, storedHash) {
        return __awaiter(this, void 0, void 0, function* () {
            // const  hashedPassword = await this._createHashPassword(password)
            return yield bcrypt_1.default.compare(password, storedHash);
        });
    }
};
