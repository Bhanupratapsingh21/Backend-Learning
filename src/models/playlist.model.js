import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [
        {
            type: Schema.Typese.ObjectId,
            ref: "Video"
        }
    ],
    owner: {
        type: Schema.Typese.ObjectId,
        ref: "User"
    }

}, { timestamps: true })


export const Playlist = mongoose.model("playlist", playlistSchema)