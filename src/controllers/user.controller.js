import { asyncHandeler } from "../utils/asynchandeler.js";
import {ApiError} from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from '../utils/apiresponse.js'
import jwt from "jsonwebtoken"

const genrateAccessandRefreshtokens = async(userid) => {
    try {
       const user = await User.findById(userid)
       
       const accessToken =  user.genrateAccessToken()
       const refreshToken = user.genrateRefreshToken()
       
       user.refreshtoken = refreshToken
       await user.save({validateBeforeSave:false})

       return { accessToken , refreshToken }

    } catch (error) {
        throw new ApiError(500,"Something Want Wrong While Genrateing refreash tokens")
    }
}

const registerUser = asyncHandeler( async (req,res)=>{
    // get data from user like email ,avatar
    // validation - not empty 
    // check if already exist ? :: username , email
    //  avatar & img check for this 
    // upload them to cloudinary or get url
    // check upload on multer or then cloidinary 
    // create user obj - create entry in db 
    // remove password or refreash token from response 
    // checl fpr user creation
    // return res

    const {username , fullname,email, password } = req.body
    console.log(req.body)
    if(
        [fullname , username,email,password].some((field)=> field?.trim()=== "")
    ) {
        throw new ApiError(400,"All Fields are required")
    }
    // await here
    const exitedUser = await User.findOne({
        $or: [{username},{email}]
    })
    
    if(exitedUser){
        throw new ApiError(409 , 'User with Email or Username already exists')
    }

    const avatarlocalpath = req.files?.avatar[0]?.path
    // const coverImagelocalpath = req.files?.coverimage[0]?.path;
    let coverImagelocalpath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImagelocalpath =req.files.coverImage[0].path
    }

    // console.log(req.files);

    if(!avatarlocalpath){
        throw new ApiError(400, "Avatar File is Required")
    }

    const avatar = await uploadOnCloudinary(avatarlocalpath)
    const coverImage = await uploadOnCloudinary(coverImagelocalpath)
    // console.log(avatar)
    if(!avatar){
        throw new ApiError(400, "Avatar File is Required")
    }

    const user = await User.create({
        fullname,
        avatar :  avatar.url,
        coverImage : coverImage?.url || "",
        email ,
        password,
        username : username.toLowerCase()

    })

    const createdUser = await User.findById(user._id).select(
        // kya kya nhi chahiye - sign k sath do yha
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500 , "Something went Wrong while registering User")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User Registered Succesfully")
    )

})



const loginUser = asyncHandeler(async (req , res)=>{
    // get data from req.body
    // username or email
    // find the user in db 
    // check password 
    // if password wrong send wrong 
    // if right gen access or refreash token's
    // send this token in cookis with secure cookies
    //  
    const { email , username , password} = req.body

    if(!username && !email){
        throw new ApiError(400,"Username Or Email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404 , "User Does Not Exist")
    }

    const ispasswordvaild =  await user.isPasswordCorrect(password)
    
    if(!ispasswordvaild){
        throw new ApiError(401 , "Invaild User Creadetials")
    }  

    const { accessToken ,  refreshToken} = await genrateAccessandRefreshtokens(user._id)
    
    const loggedinuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken ,options)
    .cookie("refreshToken" , refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedinuser,accessToken,refreshToken
            },
            "User logged In SuccessFully"
        )
    )

})

// for logout
// delete cookies or reset refreash token
// 

const logoutUser = asyncHandeler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,
    {
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    })

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200,{},"User Logged Out"))
})

const refreshAccessToken = asyncHandeler(async(req,res)=>{
   
    const incomingrefreshtoken =  req.cookies.refreshToken || req.body.refreshToken
    if(!incomingrefreshtoken){
        throw new ApiError(401,"UnAuthorized Request")
    }

    try {
        const decodedToken = jwt.verify(incomingrefreshtoken,process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401,"Invaild Refresh token")
        }
    
        if(incomingrefreshtoken !== user?.refreshToken){
            throw new  ApiError(401,"refresh token is expriys or used")
        }
    
        const options = {
            httpOnly : true,
            secure : true
        }
    
        const {newaccessToken , newrefreshToken} = await genrateAccessandRefreshtokens(user._id)
    
        return res.status(200)
        .cookie("accessToken",newaccessToken,options)
        .cookie("refreshToken",newrefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {newaccessToken,newrefreshToken},
                "accesstoken refreshed succesfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invaild Refresh Token")
    }
})

export {registerUser,loginUser,logoutUser,refreshAccessToken}