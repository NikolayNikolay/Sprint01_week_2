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
exports.postsController = void 0;
const settings_1 = require("../../../settings");
const postsService_1 = require("../domain/postsService");
const queryPostRepository_1 = require("../repository/queryPostRepository");
const mongodb_1 = require("mongodb");
exports.postsController = {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPostId = yield postsService_1.postsService.create(req.body);
            console.log(createdPostId);
            if (!createdPostId) {
                res.sendStatus(settings_1.httpStatusCodes.NOT_FOUND);
                return;
            }
            const getCreatedPost = yield queryPostRepository_1.postQueryRepository.getById(new mongodb_1.ObjectId(createdPostId));
            res.status(settings_1.httpStatusCodes.CREATED).send(getCreatedPost);
        });
    },
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield queryPostRepository_1.postQueryRepository.getAll(req.query);
            res.status(settings_1.httpStatusCodes.OK).send(allPosts);
        });
    },
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuondPost = yield queryPostRepository_1.postQueryRepository.getById(new mongodb_1.ObjectId(req.params.id));
            if (!fuondPost) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                res.status(settings_1.httpStatusCodes.OK).send(fuondPost);
            }
        });
    },
    updatePostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updetedPost = yield postsService_1.postsService.update(req.body, req.params.id);
            if (!updetedPost) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                res.send(settings_1.httpStatusCodes.NO_CONTENT);
            }
        });
    },
    deletPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedPost = yield postsService_1.postsService.deleteById(req.params.id);
            if (!deletedPost) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                res.send(settings_1.httpStatusCodes.NO_CONTENT);
            }
        });
    }
};
