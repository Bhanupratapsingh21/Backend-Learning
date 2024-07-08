import { Router } from "express"
import { 
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js"
import { verifyjwt } from "../middlewares/auth.middleware.js";

const CommentRouter = Router();

CommentRouter.post("/postcomment/:type/:postId",verifyjwt,addComment)

export default CommentRouter