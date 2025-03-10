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
exports.deletAllDataController = void 0;
// import { deleteAllDataBaseRepositoriry } from "../../repository/deleteAllDataRepository"
const deleteAllDataRepository_1 = require("../repository/deleteAllDataRepository");
const settings_1 = require("../../../settings");
const deletAllDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url === settings_1.SETTINGS.PATH.dellAllData) {
        const isEmptyBlogs = yield (0, deleteAllDataRepository_1.deleteAllDataBaseRepositoriry)();
        res.status(settings_1.httpStatusCodes.NO_CONTENT_204).send('All data is deleted');
    }
    else {
        res.send('Can not dellete all data , somthing went wrong!!!');
    }
});
exports.deletAllDataController = deletAllDataController;
