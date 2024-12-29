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
const settings_1 = require("../../settings");
const postRepository_1 = require("../../repository/mongo-db-repository/postRepository"); // local or cloud database from mongoDB
exports.postsController = {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield postRepository_1.postRepository.create(req.body);
            res.status(settings_1.httpStatusCodes.CREATED).send(createdPost);
        });
    },
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield postRepository_1.postRepository.getAll();
            res.status(settings_1.httpStatusCodes.OK).send(allPosts);
        });
    },
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuondPost = yield postRepository_1.postRepository.getById(req.params.id);
            if (!fuondPost) {
                console.log('getbyid1');
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                console.log('getbyid2');
                res.status(settings_1.httpStatusCodes.OK).send(fuondPost);
            }
        });
    },
    updatePostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updetedPost = yield postRepository_1.postRepository.update(req.body, req.params.id);
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
            const existed = yield postRepository_1.postRepository.getById(req.params.id);
            if (!existed) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                const deletedPost = yield postRepository_1.postRepository.deleteById(req.params.id);
                if (deletedPost) {
                    res.send(settings_1.httpStatusCodes.NO_CONTENT);
                    return;
                }
            }
        });
    }
};
