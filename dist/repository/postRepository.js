"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const db_1 = require("../db/db");
exports.postRepository = {
    create(input) {
        const blog = db_1.DB.blogs.find(b => b.id === input.blogId);
        if (blog) {
            const newPost = Object.assign(Object.assign({}, input), { id: Date.now() + Math.random().toString(), blogName: blog.name });
            db_1.DB.posts.push(newPost);
            return newPost;
        }
        else {
            return false;
        }
    },
    getAll() {
        const posts = db_1.DB.posts;
        return posts;
    },
    getById(id) {
        const foundPost = db_1.DB.posts.find(b => b.id === id);
        if (!foundPost) {
            return false;
        }
        return foundPost;
    },
    update(input, id) {
        const updatedPost = db_1.DB.posts.find(b => b.id === id);
        if (!updatedPost) {
            return false;
        }
        Object.assign(updatedPost, input);
        return true;
    },
    deleteById(id) {
        const deletedPost = db_1.DB.posts.filter(p => p.id !== id);
        db_1.DB.posts = deletedPost;
        const tryFindDeletedPost = exports.postRepository.getById(id);
        return tryFindDeletedPost;
    }
};
