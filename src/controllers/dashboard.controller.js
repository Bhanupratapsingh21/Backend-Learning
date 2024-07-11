import mongoose from "mongoose"
import { Video } from "../models/Video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { like } from "../models/like.model.js"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"

const getChannelStats = asyncHandeler(async (req, res) => {
    const { channelId } = req.params;

    if (!channelId) {
        return res.status(400).json(new ApiError(400, {}, "Please Provide Channel ID"));
    }

    try {
        // Count the number of subscribers
        const totalSubscribers = await Subscription.countDocuments({ channel: new mongoose.Types.ObjectId(channelId) });

        // Aggregate total views, total likes, and count total videos
        const videoStats = await Video.aggregate([
            { $match: { owner: new mongoose.Types.ObjectId(channelId) } },
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$views" },
                    totalLikes: { $sum: "$likes" },
                    totalVideos: { $sum: 1 }
                }
            }
        ]);

        const stats = videoStats[0] || { totalViews: 0, totalLikes: 0, totalVideos: 0 };

        return res.status(200).json(new ApiResponse(200, {
            totalSubscribers,
            totalViews: stats.totalViews,
            totalLikes: stats.totalLikes,
            totalVideos: stats.totalVideos
        }, "Channel Stats Fetched Successfully"));

    } catch (error) {
        console.error('Error fetching channel stats:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});


const getChannelVideos = asyncHandeler(async (req, res) => {
    const { channelId } = req.params;
    const { limit, page } = req.query;

    if (!channelId) {
        return res.status(400).json(new ApiError(400, {}, "Please Provide Channel ID"));
    }

    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {
        const videos = await Video.find({ owner: new mongoose.Types.ObjectId(channelId), isPublished: true  })
            .skip(skip)
            .limit(limitOptions);

        if (!videos.length) {
            return res.status(404).json(new ApiError(404, {}, "No Videos Found"));
        }

        const totalVideos = await Video.countDocuments({ owner: new mongoose.Types.ObjectId(channelId) });
        const totalPages = Math.ceil(totalVideos / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalVideos,
            totalPages,
            videos
        }, "Channel Videos Fetched Successfully"));

    } catch (error) {
        console.error('Error fetching channel videos:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});

export {
    getChannelStats,
    getChannelVideos
}