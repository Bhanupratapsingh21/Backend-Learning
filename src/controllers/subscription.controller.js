import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/apierror.js"
import { ApiResponse } from "../utils/apiresponse.js"
import { asyncHandeler } from "../utils/asynchandeler.js"

const toggleSubscription = asyncHandeler(async (req, res) => {
    const channelId = req.params.channelId;
    
    if (!channelId) {
        return res.status(400).json(new ApiError(400, {}, "Please provide a channel ID"));
    }

    try {
        const channel = await User.findById(channelId);
        if (!channel) {
            return res.status(404).json(new ApiError(404, {}, "Channel not found"));
        }

        const subscription = await Subscription.findOne({ subscriber: req.user._id, channel: channelId });

        if (subscription) {
            const unsubscribe = await Subscription.findByIdAndDelete(subscription._id);
            if (!unsubscribe) {
                return res.status(500).json(new ApiError(500, {}, "Error while unsubscribing from the channel, please try again"));
            }
            return res.status(200).json(new ApiResponse(200, {}, "Unsubscribed successfully"));
        } else {
            const subscribe = await Subscription.create({
                subscriber: req.user._id,
                channel: channelId
            });
            if (!subscribe) {
                return res.status(500).json(new ApiError(500, {}, "Error while subscribing to the channel, please try again"));
            }
            return res.status(200).json(new ApiResponse(200, {}, "Subscribed successfully"));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, {}, "Internal server error, please try again"));
    }
});


// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandeler(async (req, res) => {
    const { channelId } = req.params
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandeler(async (req, res) => {
    const { subscriberId } = req.params
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}