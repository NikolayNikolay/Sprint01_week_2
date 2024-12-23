"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRepository = void 0;
const db_1 = require("../db/db");
exports.blogRepository = {
    create(input) {
        const newBlog = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString() });
        db_1.DB.blogs.push(newBlog);
        return newBlog;
    },
    getAll() {
        const blogs = db_1.DB.blogs;
        return blogs;
    },
    getById(id) {
        const foundBlog = db_1.DB.blogs.find(b => b.id === id);
        if (!foundBlog) {
            return false;
        }
        return foundBlog;
    },
    update(input, id) {
        const updatedBlog = db_1.DB.blogs.find(b => b.id === id);
        if (!updatedBlog) {
            return false;
        }
        Object.assign(updatedBlog, input);
        return true;
    },
    deleteById(id) {
        const deletedBlog = db_1.DB.blogs.filter(b => b.id !== id);
        db_1.DB.blogs = deletedBlog;
        const tryFindDeletedBlog = exports.blogRepository.getById(id);
        return tryFindDeletedBlog;
    }
};
