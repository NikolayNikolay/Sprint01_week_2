"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletAllBlogsController = exports.deletByIdController = exports.updateByIdController = exports.getByIdController = exports.getAllBlogController = exports.createBlogController = void 0;
const blogsRepository_1 = require("../../repository/blogsRepository");
const settings_1 = require("../../settings");
const db_1 = require("../../db/db");
const createBlogController = (req, res) => {
    const createdBlog = blogsRepository_1.blogRepository.create(req.body);
    res.status(settings_1.httpStatusCodes.CREATED).send(createdBlog);
};
exports.createBlogController = createBlogController;
const getAllBlogController = (req, res) => {
    const allBlogs = blogsRepository_1.blogRepository.getAll();
    res.status(settings_1.httpStatusCodes.OK).send(allBlogs);
};
exports.getAllBlogController = getAllBlogController;
const getByIdController = (req, res) => {
    const fuondBlog = blogsRepository_1.blogRepository.getById(req.params.id);
    if (!fuondBlog) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
    res.status(settings_1.httpStatusCodes.OK).send(fuondBlog);
};
exports.getByIdController = getByIdController;
const updateByIdController = (req, res) => {
    const updetedBlog = blogsRepository_1.blogRepository.update(req.body, req.params.id);
    if (!updetedBlog) {
        res.send(settings_1.httpStatusCodes.NOT_FOUND);
    }
    res.send(settings_1.httpStatusCodes.NO_CONTENT);
};
exports.updateByIdController = updateByIdController;
const deletByIdController = (req, res) => {
    const existed = db_1.DB.blogs.find(b => b.id === req.params.id);
    if (existed) {
        const deletedBlog = blogsRepository_1.blogRepository.deleteById(req.params.id);
        if (!deletedBlog) {
            res.send(settings_1.httpStatusCodes.NO_CONTENT);
        }
    }
    res.send(settings_1.httpStatusCodes.NOT_FOUND);
};
exports.deletByIdController = deletByIdController;
const deletAllBlogsController = (req, res) => {
    console.log(req.url === settings_1.SETTINGS.PATH.dellAllData);
    if (req.url === settings_1.SETTINGS.PATH.dellAllData) {
        blogsRepository_1.blogRepository.deleteAllBlogs();
        const isEmptyBlogs = blogsRepository_1.blogRepository.getAll();
        if (isEmptyBlogs === db_1.DB.blogs) {
            res.status(settings_1.httpStatusCodes.NO_CONTENT).send('All data is deleted');
        }
    }
};
exports.deletAllBlogsController = deletAllBlogsController;
