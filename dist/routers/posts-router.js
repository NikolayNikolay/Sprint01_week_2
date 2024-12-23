"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const autorisMiddleweare_1 = require("../middleweares/autorisMiddleweare");
const postsController_1 = require("../controllers/postConrtoller/postsController");
const imputCheckErrorsMiddleware_1 = require("../middleweares/imputCheckErrorsMiddleware");
const postsValidations_1 = require("../validators/postsValidations");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', postsController_1.postsController.getAllPosts);
exports.postsRouter.post('/', autorisMiddleweare_1.authMiddleware, postsValidations_1.postBlogIdValidation, postsValidations_1.postTitleValidation, postsValidations_1.postShortDescriptionValidation, postsValidations_1.postContentValidation, imputCheckErrorsMiddleware_1.inputCheckErrorsMiddleware, postsController_1.postsController.createPost);
exports.postsRouter.get('/:id', postsController_1.postsController.getPostById);
exports.postsRouter.put('/:id', autorisMiddleweare_1.authMiddleware, postsValidations_1.postBlogIdValidation, postsValidations_1.postTitleValidation, postsValidations_1.postShortDescriptionValidation, postsValidations_1.postContentValidation, imputCheckErrorsMiddleware_1.inputCheckErrorsMiddleware, postsController_1.postsController.updatePostById);
exports.postsRouter.delete('/:id', autorisMiddleweare_1.authMiddleware, postsController_1.postsController.deletPostById);
