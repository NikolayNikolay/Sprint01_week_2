import { inputCheckErrorsMiddleware } from "../../../middleweares/imputCheckErrorsMiddleware";
import { postsRouter } from "../../posts/router/posts-router";
import { authenticateUser } from "../../usersAuthorisation/midllewarers/authMidllewarer";
import { postCommentsController } from "../controllers/postsCommentsController";
import { commentContentValidation } from "../validators/commentsValidations";






export const postsCommentsRouter = postsRouter





postsCommentsRouter.post('/:postId/comments',authenticateUser,commentContentValidation,inputCheckErrorsMiddleware,postCommentsController.createCommentForPost)
postsCommentsRouter.get('/:postId/comments',postCommentsController.getAllCommentsForPost)