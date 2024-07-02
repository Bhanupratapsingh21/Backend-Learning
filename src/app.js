import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()
/// use is used for middle wares or configration parts
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
    // read about cors or cridentials or whitelisting 
}))

app.use(express.json({
    limit: "16kb",
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("Public"))
app.use(cookieParser())

// routes import 
import userRouter from "./routes/user.routes.js"
import TweetsRouter from "./routes/tweets.routes.js"

// routes declaration
app.use('/api/v1/users', userRouter)
app.use("/api/v1/tweets", TweetsRouter)

export { app }