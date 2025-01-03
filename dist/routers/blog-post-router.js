"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostRouter = void 0;
const autorisMiddleweare_1 = require("../middleweares/autorisMiddleweare");
const postsValidations_1 = require("../validators/postsValidations");
const imputCheckErrorsMiddleware_1 = require("../middleweares/imputCheckErrorsMiddleware");
const postsController_1 = require("../controllers/postConrtoller/postsController");
const blog_post_controller_1 = require("../controllers/blog-post-Controller/blog-post-controller");
const express_1 = require("express");
const blogsValidatotion_1 = require("../validators/blogsValidatotion");
exports.blogPostRouter = (0, express_1.Router)();
exports.blogPostRouter.post('/:id/posts', autorisMiddleweare_1.authMiddleware, blogsValidatotion_1.blogPostsUriParamsId, postsValidations_1.postTitleValidation, postsValidations_1.postShortDescriptionValidation, postsValidations_1.postContentValidation, imputCheckErrorsMiddleware_1.inputCheckErrorsMiddleware, postsController_1.postsController.createPost);
exports.blogPostRouter.get('/:id/posts', blogsValidatotion_1.blogPostsUriParamsId, blog_post_controller_1.blogPostsController.getAllPostsForBlog);
