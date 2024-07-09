import mongoose, { isValidObjectId } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"
import verifypostowner from "../utils/checkforpostowner.js"


const createPlaylist = asyncHandeler(async (req, res) => {
    const { name, description } = req.body
    //TODO: create playlist
    if (!name || !description) {
        return res.status(402).json(new ApiError(402, {}, "Please Provide Playlist's Name And Descriptions"))
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    });

    if (!playlist) {
        return res.status(501).json(new ApiError(501, {}, "Internal Server Error Pls Try Again"))
    }

    return res.status(201).json(new ApiResponse(201, playlist, "Playlist Created Successfully Add Video In It"))
})

const getUserPlaylists = asyncHandeler(async (req, res) => {
    const { userId } = req.params
    //TODO: get user playlists
    // 
})

const getPlaylistById = asyncHandeler(async (req, res) => {
    const { playlistId } = req.params

})

const addVideoToPlaylist = asyncHandeler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!playlistId || !videoId) {
        return res.status(402).json(new ApiError(402, {}, "Please Provide Playlist ID And Video ID"))
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        return res.status(404).json(new ApiError(404, {}, "Playlist Not Found"));
    }

    const verifyowner = verifypostowner(playlist.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "Your Are Not The Owner Of this Playlist"));
    }

    const addvideo = await Playlist.findByIdAndUpdate(playlistId, {
        $push: { videos: videoId }
    }, { new: true });

    if (!addvideo) {
        return res.status(501).json(new ApiError(501, {}, "Faild To Add Video In Playlist Pls Try Again Leter"))
    }

    return res.status(201).json(new ApiResponse(201, addvideo, "Video Add To Playlist SuccessFully"))

    // aggregate will added here 
})

const removeVideoFromPlaylist = asyncHandeler(async (req, res) => {

    const { playlistId, videoId } = req.params
    if (!playlistId || !videoId) {
        return res.status(402).json(new ApiError(402, {}, "Please Provide Playlist ID And Video ID"))
    }
    try {

        const playlist = Playlist.findById(playlistId)
        if (!playlist) {
            return res.status(404).json(new ApiError(404, {}, "Playlist Not Found"));
        }

        const verifyowner = verifypostowner(playlist.owner, req.user._id);
        if (!verifyowner) {
            return res.status(401).json(new ApiError(401, {}, "Your Are Not The Owner Of this Playlist"));
        }

        playlist.videos.filter(videoid => videoid !== videoId);

        // Save the updated item
        await playlist.save();

        return res.status(201).json(new ApiResponse(201, addvideo, "Video Deleted From Playlist SuccessFully"))

    } catch (error) {
        console.log(error)
        return res.status(501).json(new ApiError(501, {}, "Internal Server Error Pls Try Again"));
    }
})

const deletePlaylist = asyncHandeler(async (req, res) => {
    const { playlistId } = req.params
    if (!playlistId) {
        return res.status(402).json(new ApiError(402, {}, "Please Provide Playlist ID"))
    }
    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        return res.status(404).json(new ApiError(404, {}, "Playlist Not Found"));
    }

    const verifyowner = verifypostowner(playlist.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "Your Are Not The Owner Of this Playlist"));
    }
    const deletePlaylist = await Playlist.findByIdAndDelete(playlist);
    if (!deletePlaylist) {
        return res.status(501).json(new ApiError(501, {}, "Error While Deleteing Playlist Pls Try Again"));
    }
    return res.status(200).json(new ApiResponse(200, {}, "Playlist Deleted SuccessFully"))


})

const updatePlaylist = asyncHandeler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(402).json(new ApiError(402, {}, "Please Provide Playlist's Name And Descriptions"))
    }
    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        return res.status(404).json(new ApiError(404, {}, "Playlist Not Found"));
    }

    const verifyowner = verifypostowner(playlist.owner, req.user._id);
    if (!verifyowner) {
        return res.status(401).json(new ApiError(401, {}, "Your Are Not The Owner Of this Playlist"));
    }

    const upadtedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
        name: name, description: description
    }, { new: true });
    if (!upadtedPlaylist) {
        return res.status(501).json(new ApiError(501, {}, "Error While Updateing Playlist"));
    }

    return res.status(new ApiResponse(200, upadtedPlaylist, "Playlist Updated Successfully"))

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}