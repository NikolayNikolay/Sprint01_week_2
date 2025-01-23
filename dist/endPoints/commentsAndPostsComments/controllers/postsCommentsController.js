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
exports.postCommentsController = void 0;
const postsCommentsServise_1 = require("../domain/postsCommentsServise");
const resultStatusToHttpStatusCode_1 = require("../../../helpers/resultStatusToHttpStatusCode");
const queryPostsCommentsRepository_1 = require("../repositories/queryPostsCommentsRepository");
exports.postCommentsController = {
    createCommentForPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield postsCommentsServise_1.postCommentsServise.createCommentForPost(req.body, req.user, req.params.postId);
            const status = (0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(result.status);
            res.status(status).json(result.data);
        });
    },
    getAllCommentsForPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield queryPostsCommentsRepository_1.queryPostsCommentsRepositotory.getAllcommentsForPost(req.query, req.params.postId);
            res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(result.status)).send(result.data);
        });
    }
};
