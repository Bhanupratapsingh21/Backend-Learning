import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
  

const app = express()
    /// use is used for middle wares or configration parts
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true ,
    // read about cors or cridentials or whitelisting 
}))

app.use(express.json({
    limit : "16kb",
}))

app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("Public"))
app.use(cookieParser())

// routes import 
import userRouter from "./routes/user.routes.js"

// routes declaration
app.use( '/api/v1/users', userRouter)

export {app}