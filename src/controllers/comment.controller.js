import mongoose from "mongoose"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"
import { json } from "express"
import { Comment } from "../models/comments.model.js"
import { Video } from "../models/Video.model.js"
import { Tweet } from "../models/tweets.model.js"
import verifypostowner from "../utils/checkforpostowner.js"

const getPostComments = asyncHandeler(async (req, res) => {
    const PostId = req.params.postId
    const { q, limit, page } = req.query;

    let sortoptions = {}
    if (q === "newestfirst") {
        sortoptions = { createdAt: -1 };
    } else if (q === "oldestfirst") {
        sortoptions = { createdAt: 1 };
    }

    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {
        const Comments = await Comment.find({ postId: PostId })
            .sort(sortoptions)
            .skip(skip)
            .limit(limitOptions);
        if (!Comments) {
            return res.status(404).json(new ApiError(404, {}, "Not Found"))
        }
        const totalComment = await Comment.countDocuments({ postId: PostId })
        const totalPages = Math.ceil(totalComment / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalPages,
            totalComment,
            Comments
        }, "Letest Video Fetched SuccessFully"));
    } catch (error) {
        console.error('Error fetching Comments:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

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
    const CommentId = req.params.commentId
    const { content } = req.body
    if (!content) {
        return res.status(401).json(new ApiError(401, {}, "Please Provide Content For Comment"));
    }

    try {
        const comment = await Comment.findById(CommentId);
        if (!comment) {
            return res.status(404).json(new ApiError(404, {}, "Comment Not Found"))
        }
        const verifyowner = verifypostowner(comment.owner, req.user._id)
        if (!verifyowner) {
            return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Comment"))
        }
        const updateComment = await Comment.findByIdAndUpdate(CommentId, { content: content }, { new: true })
        if (!updateComment) {
            return res.status(501).json(new ApiError(501, {}, "Error While Updating Comment Pls Try Again"));
        }

        return res.status(201).json(new ApiResponse(201, updateComment, "Comment Updated SuccessFullly"));

    } catch (error) {
        console.log(error)
        return res.status(501).json(new ApiError(501, {}, "Internal Server Error"))
    }
})

const deleteComment = asyncHandeler(async (req, res) => {
    const CommentId = req.params.commentId

    try {
        const comment = await Comment.findById(CommentId);
        if (!comment) {
            return res.status(404).json(new ApiError(404, {}, "Comment Not Found"))
        }
        const verifyowner = verifypostowner(comment.owner, req.user._id)
        if (!verifyowner) {
            return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Comment"))
        }

        const deletecomment = await Comment.findByIdAndDelete(CommentId);
        if (!deletecomment) {
            return res.status(501).json(new ApiError(501, {}, "Error While Updating Comment Pls Try Again"));
        }

        return res.status(201).json(new ApiResponse(201, {}, "Comment Deleted SuccessFullly"))

    } catch (error) {
        console.log(error)
        return res.status(501).json(new ApiError(501, {}, "Internal Server Error"))
    }
})

export {
    getPostComments,
    addComment,
    updateComment,
    deleteComment
}
