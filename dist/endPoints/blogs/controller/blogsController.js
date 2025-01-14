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
exports.deletByIdController = exports.updateByIdController = exports.getByIdController = exports.getAllBlogController = exports.createBlogController = void 0;
const blogsService_1 = require("../domain/blogsService");
const settings_1 = require("../../../settings");
const blogQyeryRepository_1 = require("../repository/blogQyeryRepository");
const mongodb_1 = require("mongodb");
const createBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlogId = yield blogsService_1.blogsService.create(req.body);
    if (!createdBlogId) {
        res.send(settings_1.httpStatusCodes.BAD_REQUEST);
        return;
    }
    const getCreatedBlog = yield blogQyeryRepository_1.queryBlogRepository.getById(new mongodb_1.ObjectId(createdBlogId));
    console.log(getCreatedBlog);
    res.status(settings_1.httpStatusCodes.CREATED).send(getCreatedBlog);
});
exports.createBlogController = createBlogController;
const getAllBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogQyeryRepository_1.queryBlogRepository.getAll(req.query);
    res.status(settings_1.httpStatusCodes.OK).send(allBlogs);
});
exports.getAllBlogController = getAllBlogController;
const getByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fuondBlog = yield blogQyeryRepository_1.queryBlogRepository.getById(new mongodb_1.ObjectId(req.params.id));
    if (!fuondBlog) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
    else {
        res.status(settings_1.httpStatusCodes.OK).send(fuondBlog);
    }
});
exports.getByIdController = getByIdController;
const updateByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updetedBlog = yield blogsService_1.blogsService.update(req.body, req.params.id);
    if (!updetedBlog) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
    else {
        res.send(settings_1.httpStatusCodes.NO_CONTENT);
    }
});
exports.updateByIdController = updateByIdController;
const deletByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blogsService_1.blogsService.deleteById(req.params.id);
    if (!deletedBlog) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
        return;
    }
    res.send(settings_1.httpStatusCodes.NO_CONTENT);
});
exports.deletByIdController = deletByIdController;
