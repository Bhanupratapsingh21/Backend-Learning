import { 
    handleuploadvideo,
    handlegetvideosbytimeline,
    handlegetvideoadv,
    handlegetVideoById,
    handlegetvideobytegs,
    handledeleteVideo

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


Videorouter.get("/getvideos",handlegetvideosbytimeline);
Videorouter.get("/getvideosadv" , handlegetvideoadv);
Videorouter.get("/getvideo/:id" ,handlegetVideoById);
Videorouter.get("/getvideobytegs", handlegetvideobytegs);
Videorouter.delete("/deletevideo/:id",verifyjwt,handledeleteVideo)

export default Videorouter