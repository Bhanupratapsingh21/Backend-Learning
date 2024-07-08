import mongoose from "mongoose"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"
import { json } from "express"
import { Comment } from "../models/comments.model.js"
import { Video } from "../models/Video.model.js"
import { Tweet } from "../models/tweets.model.js"

const getVideoComments = asyncHandeler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query

})

const addComment = asyncHandeler(async (req, res) => {
    // check login 
    // check data 
    const postId = req.params.postId
    const commenton = req.params.type

    const { content } = req.body
    if (!content) {
        return res.status(401).json(new ApiError(401, {}, "Please Provide Content For Comment"));
    }
    if (!postId || !commenton) {
        return res.status(401).json(new ApiError(401, {}, "Please Provide Comment Type & PostID"));
    }

    try {
        if (commenton === "Video") {
            const video = await Video.findById(postId)
            if (!video) {
                return res.status(404).json(new ApiError(404, {}, `Your ${commenton} Is Not Found`));
            }
        } else if (commenton === "Tweet") {
            const tweet = await Tweet.findById(postId)
            if (!tweet) {
                return res.status(404).json(new ApiError(404, {}, `Your ${commenton} Is Not Found`));
            }
        } else {
            return res.status(404).json(new ApiError(404, {}, `Your ${commenton} Is Not Found`));
        }
    } catch (error) {
        console.log(error)
        return res.status(501).json(new ApiError(501, {}, "Internal Server Error"))
    }

    const comment = await Comment.create({
        content,
        commenton,
        postId,
        owner: req.user._id
    });

    if (!comment) {
        return res.status(501).json(new ApiError(501, {}, "Error While Added Commnet"))
    }

    return res.status(201).json(new ApiResponse(201, comment, "Comment Posted SuccessFullly"))

})

const updateComment = asyncHandeler(async (req, res) => {
   
})

const deleteComment = asyncHandeler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}
