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
exports.usersRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
exports.usersRepository = {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUserId = yield mongo_db_1.usersCollection.insertOne(user);
            return createdUserId.insertedId.toString();
        });
    },
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield mongo_db_1.usersCollection.deleteOne({ '_id': userId });
            return deletedUser.deletedCount === 1;
        });
    },
    findUserByEmailOrLogin(emailOrLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const existinguserEmailOrLogin = yield mongo_db_1.usersCollection.findOne({ $or: [{ 'email': emailOrLogin }, { 'login': emailOrLogin }] });
            return existinguserEmailOrLogin;
        });
    },
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield mongo_db_1.usersCollection.findOne({ '_id': userId });
            return existingUser;
        });
    }
};
