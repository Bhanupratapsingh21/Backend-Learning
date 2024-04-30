import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});


const uploadOnCloudinary = async ( localFilePath ) => {
    try {
        if(!localFilePath) return null
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "auto"
        })
        // file has been uploaded successfull
        // console.log("File is Uploaded On cloudinary");
        // console.log(response.url)
        fs.unlinkSync(localFilePath) // delete local file after cloud upload
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the local file from localy saved tmp file as the upload failed
        return null;
    }
}


export { uploadOnCloudinary } 