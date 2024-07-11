import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getWatchHistory,
    GetUserChannalProfile
} from "../controllers/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { getChannelStats, getChannelVideos } from "../controllers/dashboard.controller.js";

const router = Router();
router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,

        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);


router.route("/login").post(
    loginUser
)


// secured routes
router.route("/logout").post(verifyjwt, logoutUser)
router.route("/refreashtoken").post(refreshAccessToken)
router.route("/change-password").post(verifyjwt, changeCurrentPassword)
router.route("/current-user").post(verifyjwt, getCurrentUser)

router.route("/update-account").patch(verifyjwt, updateAccountDetails)
router.route("/avatar").patch(verifyjwt, upload.single("avatar"), updateUserAvatar)
router.route("/coverImage").patch(verifyjwt, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyjwt, GetUserChannalProfile)
router.route("/history").get(verifyjwt, getWatchHistory)
router.route("/dashboard/:channelId").get(verifyjwt,getChannelStats)
router.route("/getvideos/:channelId").get(getChannelVideos)



export default router