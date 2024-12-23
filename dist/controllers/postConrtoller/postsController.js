"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsController = void 0;
const settings_1 = require("../../settings");
const postRepository_1 = require("../../repository/postRepository");
const db_1 = require("../../db/db");
exports.postsController = {
    createPost(req, res) {
        const createdPost = postRepository_1.postRepository.create(req.body);
        res.status(settings_1.httpStatusCodes.CREATED).send(createdPost);
    },
    getAllPosts(req, res) {
        const allPosts = postRepository_1.postRepository.getAll();
        res.status(settings_1.httpStatusCodes.OK).send(allPosts);
    },
    getPostById(req, res) {
        const fuondPost = postRepository_1.postRepository.getById(req.params.id);
        if (!fuondPost) {
            res.send(settings_1.httpStatusCodes.NOT_FOUND);
        }
        res.status(settings_1.httpStatusCodes.OK).send(fuondPost);
    },
    updatePostById(req, res) {
        const updetedPost = postRepository_1.postRepository.update(req.body, req.params.id);
        if (!updetedPost) {
            res.send(settings_1.httpStatusCodes.NOT_FOUND);
        }
        res.send(settings_1.httpStatusCodes.NO_CONTENT);
    },
    deletPostById(req, res) {
        const existed = db_1.DB.posts.find(p => p.id === req.params.id);
        if (existed) {
            const deletedPost = postRepository_1.postRepository.deleteById(req.params.id);
            if (!deletedPost) {
                res.send(settings_1.httpStatusCodes.NO_CONTENT);
            }
        }
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
};
