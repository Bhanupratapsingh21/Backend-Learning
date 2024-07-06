import mongoose from "mongoose";
import { asyncHandeler } from "../utils/asynchandeler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { Video } from "../models/Video.model.js";
import { deletefromcloudinary, videodeletefromcloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import verifypostowner from "../utils/checkforpostowner.js";
import { User } from "../models/user.model.js";

const handleuploadvideo = asyncHandeler(async (req, res) => {
    // get video uploaded at multer surver then 
    // get video uploaded at cloudinary 
    // get thumbnail uploaded at multer then cloudinary 
    // create document of video 
    // get duration from cloudinary 
    // and all set 

    const { tittle, description, isPublished, tegs } = req.body
    if (!tittle || !description || !isPublished) {
        return res
            .status(400)
            .json(new ApiError(400, {}, "All Field Required Atleast Tittle and Descriptions"))
    }


    let videofilelocal;
    if (req.files && Array.isArray(req.files.videofile) && req.files.videofile.length > 0) {
        videofilelocal = req.files.videofile[0]?.path
    }

    let thumbnaillocal;
    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnaillocal = req.files.thumbnail[0]?.path
    }

    // console.log(videofile, thumbnail)
    if (!videofilelocal || !thumbnaillocal) {
        return res.status(401).json(new ApiError(401, {}, "Video File And Thumbnail Are Required"))
    }
    // console.log("done")
    const videofile = await uploadOnCloudinary(videofilelocal);
    const thumbnail = await uploadOnCloudinary(thumbnaillocal);

    if (!videofile || !thumbnail) {
        return res.status(501).json(new ApiError(501, {}, "An Error occurred While Uploading"))
    }

    const UploadedVideo = await Video.create({
        tittle,
        description,
        isPublished,
        tegs,
        videoFile: videofile.url,
        thumbnail: thumbnail.url,
        duration: videofile.duration,
        views: 0,
        owner: req.user._id,
    })

    if (!UploadedVideo) {
        return res
            .status(501)
            .json(new ApiError(501, {}, "internal Server Error"))
    }
    return res
        .status(201)
        .json(new ApiResponse(201, UploadedVideo, "Video Uploaded SuccessFully"));

});

const handlegetvideosbytimeline = asyncHandeler(async (req, res) => {

    const { q, limit } = req.query;
    let sortOption = {}
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === "oldestfirst") {
        sortOption = { createdAt: 1 };
    } else {
        return res.status(301).json(new ApiError(301, {}, "Invaild Request"))
    }
    const limitOptions = parseInt(limit) || 10; // limit to send 

    try {
        const videos = await Video.find().sort(sortOption).limit(limitOptions)
        if (!videos) {
            return res.status(501).json(new ApiError(501, {}, "Server And Database Error pls Try Again After Some Months"))
        }
        return res.status(200).json(new ApiResponse(200, videos, `Video Fetched SuccessFully With Sorted by ${q}`))
    } catch (error) {
        console.error('Error fetching Video:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

});

const handlegetvideoadv = asyncHandeler(async (req, res) => {
    const { q, limit, page } = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }


    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {
        const videos = await Video.find({ isPublished: true })
            .sort(sortOption)
            .skip(skip)
            .limit(limitOptions);

        // Count the total number of published videos
        const totalVideos = await Video.countDocuments({ isPublished: true });
        const totalPages = Math.ceil(totalVideos / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalPages,
            totalVideos,
            videos
        }, "Latest Videos Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching videos:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

})

const handlegetVideoById = asyncHandeler(async (req, res) => {
    const _id = req.params.id
    const video = await Video.findByIdAndUpdate(_id,{ $inc: { views: 1 } }, { new: true })

    if (!video) return res.status(404).json(new ApiError(404, {}, "Your Requested Video Not Found"))

    if(req.user){
        const updatehistory = await User.findByIdAndUpdate(req.user._id,{ $push: { watchHistory: new mongoose.Types.ObjectId(video._id) },},{ new: true })
        // console.log(updatehistory)
    }

    return res
        .status(200)
        .json(new ApiResponse(200, video, "Video Fetched Successfullly"))
})

const handlegetvideobytegs = asyncHandeler(async (req, res) => {

    const { tegs } = req.body
    if (!tegs) return res.status(401).json(new ApiError(401, {}, "please provide Atleast One Teg"))
    const tagsarry = tegs.split(',').map(tag => tag.trim())

    const { q, limit, page } = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }


    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {

        const videos = await Video.find({ tegs: { $in: tagsarry.map(tag => new RegExp(tag, 'i')) }, isPublished: true })
            .sort(sortOption)
            .skip(skip)
            .limit(limitOptions);
        // const videos = Video.find({tegs : {$in : tegs } });


        // Count the total number of published videos
        const totalVideos = await Video.countDocuments({  tegs: { $in: tagsarry.map(tag => new RegExp(tag, 'i')) },isPublished: true });
        const totalPages = Math.ceil(totalVideos / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalPages,
            totalVideos,
            videos
        }, "Latest Videos Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching videos:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

})


const updateVideodetails = asyncHandeler(async (req, res) => {
    const _id = req.params.id

    //TODO: update video details like title, description, thumbnail

    if (!_id) return res.status(400).json(new ApiError(400, {}, "Please Provide Video ID"))

    const lastversionvideo = await Video.findById(_id);
    if (!lastversionvideo) return res.status(404).json(new ApiError(404, {}, "Your Requested Video Not Founded"));

    // console.log(video.owner)
    // console.log(req.user._id)

    const verifyowner = verifypostowner(lastversionvideo.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Video"))
    }

    const thumbnailimglocal = req.files?.thumbnail?.[0].path;
    const { tittle, description, tegs } = req.body

    // intialize data 
    const videodata = {
        tittle,
        description,
        tegs
    }
    if (thumbnailimglocal) {
        const uploadnewimage = await uploadOnCloudinary(thumbnailimglocal);

        if (!uploadnewimage) {
            return res.status(500).json(new ApiError(500, {}, "Failed to upload image"));
        }

        if (lastversionvideo && lastversionvideo.thumbnail) {
            const public_id = extractIdfromurl(lastversionvideo.thumbnail)
            await deletefromcloudinary(public_id);
        }

        videodata.thumbnail = uploadnewimage.url

    }

    const updatedvideodata = await Video.findByIdAndUpdate(_id, videodata, { new: true });
    if (!updatedvideodata) {
        return res.status(404).json(new ApiError(404, {}, "Video Not Found & Faild to Update"));
    }
    return res.status(200).json(new ApiResponse(200, updatedvideodata, "Video Edited Successfully And Updated"));

})

const handledeleteVideo = asyncHandeler(async (req, res) => {
    const _id = req.params.id

    const video = await Video.findById(_id);
    if (!video) return res.status(404).json(new ApiError(404, {}, "Your Requested Video Not Founded"));
    // console.log(video.owner)
    // console.log(req.user._id)
    const verifyowner = verifypostowner(video.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Video"))
    }

    const deletedvideo = await Video.findByIdAndDelete(_id)
    if (!deletedvideo) {
        return res.status(404).json(new ApiResponse(404, {}, "Some Error Occerd While Deleteing Video"));
    }
    const videopublicid = extractIdfromurl(deletedvideo.videoFile)
    const thumbnailpublicid = extractIdfromurl(deletedvideo.thumbnail)
    // console.log(videopublicid)
    // console.log(thumbnailpublicid)
    const videodeletefromcloud = await videodeletefromcloudinary(videopublicid)
    const thumbnaildeletefromcloud = await deletefromcloudinary(thumbnailpublicid)

    // console.log(videodeletefromcloud, thumbnaildeletefromcloud)

    return res.status(200).json(new ApiResponse(200, {}, "Video Deleted SuccssFully"))

})

const togglePublishStatus = asyncHandeler(async (req, res) => {
    const videoId = req.params.id
    if (!videoId) {
        return res.status(401).json(new ApiError(401, {}, "Please Provide Video Id"))
    }

    const video = await Video.findById(videoId)
    if (!video) return res.stauts(404).json(404, {}, "Your Requested Video Not Founded")

    const verifyowner = verifypostowner(video.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Video"))
    }


    video.isPublished = !video.isPublished // toggle the value
    const response = await video.save();
    if (!response) return res.status(501).json(new ApiError(501, {}, "Failed To Update Status Please try Again"))

    return res.status(201).json(new ApiResponse(201, {}, "Status Set SuccessFully"))

})

const extractIdfromurl = (url) => {
    const regex = /\/([^\/]+)\.[a-zA-Z0-9]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export {
    handlegetvideosbytimeline,
    handleuploadvideo,
    handlegetvideoadv,
    handlegetVideoById,
    handlegetvideobytegs,
    updateVideodetails,
    handledeleteVideo,
    togglePublishStatus
}