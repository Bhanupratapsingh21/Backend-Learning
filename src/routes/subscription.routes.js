import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middleware.js"
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} from "../controllers/subscription.controller.js";

const SubscriptionRouter = Router()

SubscriptionRouter.post("/addSubscriptions/:channelId", verifyjwt, toggleSubscription);

export default SubscriptionRouter