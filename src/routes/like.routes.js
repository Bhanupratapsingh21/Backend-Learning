import { 
    getLikedVideos,
    toggleTweetLike,
    toggleCommentLike,
    toggleVideoLike,
} from "../controllers/like.controller";
import { Router } from "express";

const LikeRouter = Router()

LikeRouter.get("/like/video/:id", toggleVideoLike);

export default LikeRouter