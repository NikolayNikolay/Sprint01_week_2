"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllDataBase = void 0;
const db_1 = require("../db/db");
const deleteAllDataBase = () => {
    db_1.DB.blogs = [];
    db_1.DB.posts = [];
    console.log(db_1.DB.blogs, db_1.DB.posts);
};
exports.deleteAllDataBase = deleteAllDataBase;
