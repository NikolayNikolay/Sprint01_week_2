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
exports.queryUsersController = void 0;
const queryParamsPaginations_1 = require("../../../helpers/queryParamsPaginations");
const queryUsersRepository_1 = require("../queryRepository/queryUsersRepository");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
const settings_1 = require("../../../settings");
exports.queryUsersController = {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterParams = (0, queryParamsPaginations_1.filter)(req.query);
            const totalCount = yield queryUsersRepository_1.queryUsersRepository.totalCount(filterParams);
            const paginationForUsers = (0, queryParamsPaginations_1.PaginationQueryParams)(req.query);
            let users = yield queryUsersRepository_1.queryUsersRepository.getAllUsers(paginationForUsers, filterParams);
            users = (0, viewModelsMapMethod_1.mapViewUsersModel)(users);
            const allData = {
                pagesCount: Math.ceil(totalCount / paginationForUsers.pageSize),
                page: paginationForUsers.pageNumber,
                pageSize: paginationForUsers.pageSize,
                totalCount: totalCount,
                items: users
            };
            res.status(settings_1.httpStatusCodes.OK).send(allData);
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
