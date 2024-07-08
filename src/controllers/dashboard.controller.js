import mongoose from "mongoose"
import { Video } from "../models/Video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"

const getChannelStats = asyncHandeler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
})

const getChannelVideos = asyncHandeler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
})

export {
    getChannelStats,
    getChannelVideos
}