"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autorisMiddleweare_1 = require("../middleweares/autorisMiddleweare");
const blogs_router_1 = require("./blogs-router");
const postsValidations_1 = require("../validators/postsValidations");
const imputCheckErrorsMiddleware_1 = require("../middleweares/imputCheckErrorsMiddleware");
const postsController_1 = require("../controllers/postConrtoller/postsController");
blogs_router_1.blogsRouter.post('/:id/posts', autorisMiddleweare_1.authMiddleware, postsValidations_1.postBlogIdValidation, postsValidations_1.postTitleValidation, postsValidations_1.postShortDescriptionValidation, postsValidations_1.postContentValidation, imputCheckErrorsMiddleware_1.inputCheckErrorsMiddleware, postsController_1.postsController.createPost);
blogs_router_1.blogsRouter.get('/:id/posts', autorisMiddleweare_1.authMiddleware, postsController_1.postsController.getPostById);
