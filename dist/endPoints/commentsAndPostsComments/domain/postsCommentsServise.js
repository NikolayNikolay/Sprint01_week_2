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
exports.postCommentsServise = void 0;
const mongodb_1 = require("mongodb");
const postRepository_1 = require("../../posts/repository/postRepository");
const resultResponsObject_1 = require("../../../helpers/resultResponsObject");
const resultStatus_1 = require("../../../enums/resultStatus");
const postsCommentsRepository_1 = require("../repositories/postsCommentsRepository");
exports.postCommentsServise = {
    createCommentForPost(inputData, userInfo, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPost = yield postRepository_1.postRepository.getById(new mongodb_1.ObjectId(postId));
            if (!checkPost) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found post', null, { field: 'postId', message: 'not found' });
            }
            const comment = {
                content: inputData.content,
                commentatorInfo: {
                    userId: userInfo.id,
                    userLogin: userInfo.name
                },
                createdAt: new Date().toISOString(),
                'postId': postId
            };
            const createdComment = yield postsCommentsRepository_1.postsCommentsRepository.createCommentForPost(comment);
            if (!createdComment) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found');
            }
            const getComment = yield postsCommentsRepository_1.postsCommentsRepository.getCommentById(createdComment);
            console.log(getComment);
            if (!getComment) {
                return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.NotFound, 'Not Found');
            }
            return (0, resultResponsObject_1.resultResponsObject)(resultStatus_1.ResultStatus.Created, 'Created', getComment);
        });
    }
};
