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
exports.queryUsersRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
const serchFilter_1 = require("../../../helpers/serchFilter");
exports.queryUsersRepository = {
    getAllUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            //filter by some params
            const filterParams = (0, serchFilter_1.filter)(query);
            //get tottal quantity by some filter params
            const totalCount = yield exports.queryUsersRepository.totalCount(filterParams);
            //pagination by query request, if some query missing set defolt params
            const paginationForUsers = (0, queryParamsPaginations_1.PaginationQueryParams)(query);
            let users = yield mongo_db_1.usersCollection
                .find(filterParams)
                .sort(paginationForUsers.sortBy, paginationForUsers.sortDirection)
                .skip((paginationForUsers.pageNumber - 1) * paginationForUsers.pageSize)
                .limit(paginationForUsers.pageSize)
                .toArray();
            users = (0, viewModelsMapMethod_1.mapViewUsersModel)(users);
            return {
                pagesCount: Math.ceil(totalCount / paginationForUsers.pageSize),
                page: paginationForUsers.pageNumber,
                pageSize: paginationForUsers.pageSize,
                totalCount: totalCount,
                items: users
            };
        });
    },
    getUserById(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.usersCollection.findOne({ '_id': idUser });
            return user ? (0, viewModelsMapMethod_1.mapViewUsersModel)(user) : user;
        });
    },
    totalCount(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const total = yield mongo_db_1.usersCollection.countDocuments(params);
            return total;
        });
    }
};
