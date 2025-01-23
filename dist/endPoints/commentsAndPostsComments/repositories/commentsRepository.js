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
exports.commentsRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
exports.commentsRepository = {
    getOneCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const findById = yield mongo_db_1.commentsCollection.findOne({ _id: id });
            return findById;
        });
    },
    updateCommentbyId(input, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultUpdate = yield mongo_db_1.commentsCollection.updateOne({ _id: id }, { $set: Object.assign({}, input) });
            return resultUpdate.acknowledged;
        });
    },
    deleteCommentbyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDeleted = yield mongo_db_1.commentsCollection.deleteOne({ _id: id });
            console.log(id, resultDeleted);
            return resultDeleted.deletedCount === 1;
        });
    },
};
