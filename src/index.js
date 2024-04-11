//require('dotenv').config({path : "./env"})
import dotenv from 'dotenv'

// always use try catch and promises in db so you will be able to handle error or use async await for it also
import connectDB from './db/index.js';

dotenv.config({
    path : "./env"
})
// 2nd approch
// with db index.js then =>

connectDB();


/*
import express from 'express'
const app = express()


( async ()=>{
    try {
        
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error not able to listin",error);

        })
        app.listen(process.env.PORT , ()=>{
            console.log(`App is listening on Port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log( "Error", error)

    }
})()*/
