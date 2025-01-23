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
exports.postsCommentsRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const viewModelsMapMethod_1 = require("../../../helpers/viewModelsMapMethod");
exports.postsCommentsRepository = {
    createCommentForPost(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentForPost = yield mongo_db_1.commentsCollection.insertOne(comment);
            return commentForPost.insertedId;
        });
    },
    getCommentById(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundComment = yield mongo_db_1.commentsCollection.findOne({ _id: commentId });
            return (0, viewModelsMapMethod_1.mapViewCommentsModel)(foundComment);
        });
    }
};
