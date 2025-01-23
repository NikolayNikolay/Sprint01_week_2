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
exports.commentsController = void 0;
const comentsServise_1 = require("../domain/comentsServise");
const resultStatusToHttpStatusCode_1 = require("../../../helpers/resultStatusToHttpStatusCode");
const queryCommentsRepository_1 = require("../repositories/queryCommentsRepository");
const mongodb_1 = require("mongodb");
exports.commentsController = {
    updateComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield comentsServise_1.commentsServise.updateComment(req.body, req.params.commentId, req.user.id);
            res.send((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(updateResult.status));
        });
    },
    getOneCommentsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundResult = yield queryCommentsRepository_1.queryCommentsRepository.getOneCommentById(new mongodb_1.ObjectId(req.params.id));
            res.status((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(foundResult.status)).send(foundResult.data);
        });
    },
    deleteComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedResult = yield comentsServise_1.commentsServise.deleteComent(req.params.commentId, req.user.id);
            res.send((0, resultStatusToHttpStatusCode_1.resultStatusToHttpStatusCode)(deletedResult.status));
        });
    }
};
