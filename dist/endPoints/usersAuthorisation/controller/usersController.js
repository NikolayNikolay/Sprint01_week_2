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
exports.usersController = void 0;
const queryUsersRepository_1 = require("../queryRepository/queryUsersRepository");
const settings_1 = require("../../../settings");
const usersService_1 = require("../domain/usersService");
const mongodb_1 = require("mongodb");
exports.usersController = {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield queryUsersRepository_1.queryUsersRepository.getAllUsers(req.query);
            res.status(settings_1.httpStatusCodes.OK).send(users);
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield queryUsersRepository_1.queryUsersRepository.getUserById(new mongodb_1.ObjectId(req.params.id));
            if (!user) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
                return;
            }
            res.status(settings_1.httpStatusCodes.OK).send(user);
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield usersService_1.usersCervice.createUser(req.body);
            if (typeof userId === 'string') {
                const getCreatedUser = yield queryUsersRepository_1.queryUsersRepository.getUserById(new mongodb_1.ObjectId(userId));
                res.status(settings_1.httpStatusCodes.CREATED).send(getCreatedUser);
            }
            else {
                res.status(settings_1.httpStatusCodes.BAD_REQUEST).send(userId);
                return;
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield usersService_1.usersCervice.deletUser(req.params.id);
            if (!deletedUser) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
                return;
            }
            res.send(settings_1.httpStatusCodes.NO_CONTENT);
        });
    }
};
