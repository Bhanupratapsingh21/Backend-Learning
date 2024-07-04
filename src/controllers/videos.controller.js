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

});

const handlegetvideosbytimeline = asyncHandeler(async(req,res)=>{
    
    const {q , limit} = req.query;
    let sortOption = {}
    if(q === "newestfirst"){
        sortOption = { createdAt : -1 };
    }else if(q === "oldestfirst"){
        sortOption = {createdAt : 1};
    }else{
        return res.status(301).json(new ApiError(301,{},"Invaild Request"))
    }
    const limitOptions = parseInt(limit) || 10; // limit to send 

    try {
        const videos = await Video.find().sort(sortOption).limit(limitOptions)
        if(!videos){
            return res.status(501).json(new ApiError(501, {}, "Server And Database Error pls Try Again After Some Months"))
        }
        return res.status(200).json(new ApiResponse(200,videos,`Video Fetched SuccessFully With Sorted by ${q}`))
    } catch (error) {
        console.error('Error fetching Video:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

});

const handlegetvideoadv = asyncHandeler(async(req,res)=>{
    // first get the data from params and quarrys   
    const { q, limit , page} = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }   

    // then added a sortoption to sort it ar the oldest first and newst first

    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {
        const videos = await Video.find()
            .sort(sortOption)
            .skip(skip)
            .limit(limitOptions);

        const totalVideos = await Video.countDocuments();
        const totalPages = Math.ceil(totalVideos / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalPages,
            totalVideos,
            videos
        }, "Latest Tweets Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

})


export {
    handlegetvideosbytimeline,
    handleuploadvideo,
    handlegetvideoadv,
}
