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
exports.commentsServise = void 0;
const mongodb_1 = require("mongodb");
const commentsRepository_1 = require("../repositories/commentsRepository");
const resultStatus_1 = require("../../../enums/resultStatus");
const resultResponsObject_1 = require("../../../helpers/resultResponsObject");
exports.commentsServise = {
    updateComment(input, commentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const canBeUpdate = yield commentsRepository_1.commentsRepository.getOneCommentById(new mongodb_1.ObjectId(commentId));
            if (!canBeUpdate) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { field: 'commentId', message: 'incorrect Id' });
            }
            if (canBeUpdate.commentatorInfo.userId !== userId) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Forbidden, 'Forbidden', null, { field: 'commentId', message: 'Forbidden act' });
            }
            const resultUpdate = yield commentsRepository_1.commentsRepository.updateCommentbyId(input, new mongodb_1.ObjectId(commentId));
            if (!resultUpdate) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.BadRequest, 'Bad Request', null, { field: 'input data', message: 'somthing wrong' });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'SuccessNoContent');
        });
    },
    deleteComent(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const canBeDeleted = yield commentsRepository_1.commentsRepository.getOneCommentById(new mongodb_1.ObjectId(id));
            if (!canBeDeleted) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { field: 'commentId', message: 'incorrect Id' });
            }
            if (canBeDeleted.commentatorInfo.userId !== userId) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Forbidden, 'Forbidden', null, { field: 'commentId', message: 'Forbidden act' });
            }
            const deletedResult = yield commentsRepository_1.commentsRepository.deleteCommentbyId(new mongodb_1.ObjectId(id));
            if (!deletedResult) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found', null, { field: 'input data', message: 'somthing wrong' });
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.SuccessNoContent, 'SuccessNoContent');
        });
    }
};
