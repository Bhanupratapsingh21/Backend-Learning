import { 
    handleuploadvideo
} from "../controllers/videos.controller.js";
import { Router } from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const Videorouter = Router();

Videorouter.post("/addvideo", verifyjwt, upload.fields(
    [
        {
            name : "videofile",
            maxCount : 1
        },
        {
            name : "thumbnail",
            maxCount : 1
        }
    ]
),handleuploadvideo);

export default Videorouter
