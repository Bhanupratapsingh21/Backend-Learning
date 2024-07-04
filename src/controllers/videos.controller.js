import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asynchandeler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Video } from "../models/Video.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const handleuploadvideo = asyncHandeler(async(req,res)=>{
    // get video uploaded at multer surver then 
    // get video uploaded at cloudinary 
    // get thumbnail uploaded at multer then cloudinary 
    // create document of video 
    // get duration from cloudinary 
    // and all set 

    const {tittle , description,isPublished,tegs} = req.body 
    if(!tittle || !description || !isPublished){
        return res
        .status(400)
        .json(new ApiError(400, {}, "All Field Required Atleast Tittle and Descriptions"))
    }
    

    let videofilelocal;
    if(req.files && Array.isArray(req.files.videofile)&& req.files.videofile.length > 0){
        videofilelocal = req.files.videofile[0]?.path
    }

    let thumbnaillocal;
    if(req.files && Array.isArray(req.files.thumbnail)&& req.files.thumbnail.length > 0){
        thumbnaillocal = req.files.thumbnail[0]?.path
    }

    // console.log(videofile, thumbnail)
    if(!videofilelocal || !thumbnaillocal){
        return res.status(401).json(new ApiError(401,{},"Video File And Thumbnail Are Required"))
    }
    // console.log("done")
    const videofile = await uploadOnCloudinary(videofilelocal);
    const thumbnail = await uploadOnCloudinary(thumbnaillocal);

    if(!videofile || !thumbnail){
        return res.status(501).json(new ApiError(501,{},"An Error occurred While Uploading"))
    }

    const UploadedVideo = await Video.create({
        tittle,
        description,
        isPublished,
        tegs,
        videoFile : videofile.url,
        thumbnail : thumbnail.url,
        duration : videofile.duration,
        views : 0 ,
        owner : req.user._id,
    })

    if(!UploadedVideo){
        return res
        .status(501)
        .json(new ApiError(501,{},"internal Server Error"))
    }
    return res
    .status(201)
    .json(new ApiResponse(201,UploadedVideo,"Video Uploaded SuccessFully"));

})


export {
    handleuploadvideo,
}
