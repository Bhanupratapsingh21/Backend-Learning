import { asyncHandeler } from "../utils/asynchandeler.js";
import {ApiError} from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from '../utils/apiresponse.js'

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

export {registerUser}