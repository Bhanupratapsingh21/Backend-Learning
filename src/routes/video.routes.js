import { 
    handleuploadvideo,
    handlegetvideosbytimeline,
    handlegetvideoadv
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

Videorouter.get("/getvideos",handlegetvideosbytimeline)
Videorouter.get("/getvideosadv" , handlegetvideoadv)
export default Videorouter
