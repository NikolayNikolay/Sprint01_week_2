"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletAllDataController = void 0;
const blogsRepository_1 = require("../../repository/blogsRepository");
const settings_1 = require("../../settings");
const db_1 = require("../../db/db");
const deleteAllDataRepository_1 = require("../../repository/deleteAllDataRepository");
const deletAllDataController = (req, res) => {
    console.log(req.url === settings_1.SETTINGS.PATH.dellAllData);
    if (req.url === settings_1.SETTINGS.PATH.dellAllData) {
        (0, deleteAllDataRepository_1.deleteAllDataBaseRepositoriry)();
        const isEmptyBlogs = blogsRepository_1.blogRepository.getAll();
        if (isEmptyBlogs === db_1.DB.blogs) {
            res.status(settings_1.httpStatusCodes.NO_CONTENT).send('All data is deleted');
        }
    }
};
exports.deletAllDataController = deletAllDataController;
