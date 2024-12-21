"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = void 0;
const db_1 = require("../db/db");
exports.blogRepository = {
    create(input) {
        const newBlog = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString() });
        db_1.DB.blogs.push(newBlog);
        return newBlog;
    }
};
