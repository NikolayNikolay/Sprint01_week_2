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
const postsService_1 = require("../../domain/postsService");
exports.postsController = {
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield postsService_1.postsService.create(req.body);
            if (!createdPost) {
                res.send(settings_1.httpStatusCodes.BAD_REQUEST);
            }
            res.status(settings_1.httpStatusCodes.CREATED).send(createdPost);
        });
    },
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allPosts = yield postsService_1.postsService.getAll();
            res.status(settings_1.httpStatusCodes.OK).send(allPosts);
        });
    },
    getPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fuondPost = yield postsService_1.postsService.getById(req.params.id);
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
            const existed = yield postsService_1.postsService.getById(req.params.id);
            if (!existed) {
                res.send(settings_1.httpStatusCodes.NOT_FOUND);
            }
            else {
                const deletedPost = yield postsService_1.postsService.deleteById(req.params.id);
                if (deletedPost) {
                    res.send(settings_1.httpStatusCodes.NO_CONTENT);
                    return;
                }
            }
        });
    }
};
