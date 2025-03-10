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
const settings_1 = require("../../settings");
const blogsService_1 = require("../../domain/blogsService");
const createBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBlog = yield blogsService_1.blogsService.create(req.body);
    res.status(settings_1.httpStatusCodes.CREATED).send(createdBlog);
});
exports.createBlogController = createBlogController;
const getAllBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBlogs = yield blogsService_1.blogsService.getAll(req.query);
    res.status(settings_1.httpStatusCodes.OK).send(allBlogs);
});
exports.getAllBlogController = getAllBlogController;
const getByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fuondBlog = yield blogsService_1.blogsService.getById(req.params.id);
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
    const existed = yield blogsService_1.blogsService.getById(req.params.id);
    if (!existed) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
    else {
        const deletedBlog = yield blogsService_1.blogsService.deleteById(req.params.id);
        if (deletedBlog) {
            res.send(settings_1.httpStatusCodes.NO_CONTENT);
            return;
        }
    }
});
exports.deletByIdController = deletByIdController;
