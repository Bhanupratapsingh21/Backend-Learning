import { Tweet } from "../models/tweets.model.js";
import { uploadOnCloudinary, deletefromcloudinary } from "../utils/cloudinary.js";
import { asyncHandeler } from "../utils/asynchandeler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";
import verifypostowner from "../utils/checkforpostowner.js";

const handleaddblogs = asyncHandeler(async (req, res) => {
    try {
        // Check if profile image file exists
        const profileImgPath = req.files?.tweetthumbnail?.[0]?.path;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json(new ApiError(400, {}, "Please Add Atleat Some Words To tweet"));
        }
        if (!profileImgPath) {
            return res.status(400).json(new ApiError(400, {}, "Profile image is required"));
        }

        // Upload image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(profileImgPath);
        if (!uploadedImage) {
            return res.status(500).json(new ApiError(500, {}, "Failed to upload image"));
        }

        const blog = await Tweet.create({
            content,
            coverImageURL: {
                url: uploadedImage.url,
                public_id: uploadedImage.public_id
            },
            createdBy: {
                _id: req.user._id,
                username: req.user.username,
                profileimg: req.user.avatar.url,
            },
        });

        if (!blog) {
            return res.status(501).json(new ApiError(501, {}, "Something Went Wrong While Posting Tweet"));
        }

        return res.status(201).json(new ApiResponse(201, blog, "Successfully Uploaded Tweet"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, {}, `Server Error :: ${error}`));
    }
});

const getblogsbasic = asyncHandeler(async (req, res) => {
    const { q, limit } = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }

    const limitOptions = parseInt(limit) || 10; // default will be 10 in case url not will hit

    try {
        const blogs = await Tweet.find().sort(sortOption).limit(limitOptions);
        return res.status(200).json(new ApiResponse(200, blogs, "Latest Tweets Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});

const getblogsAdv = asyncHandeler(async (req,res)=>{
    // first get the data from params and quarrys   
    const { q, limit,page } = req.query;
    let sortOption = {};
    if (q === "newestfirst") {
        sortOption = { createdAt: -1 };
    } else if (q === 'oldestfirst') {
        sortOption = { createdAt: 1 };
    }   

    // then added a sortoption to sort it ar the oldest first and newst first

    const pageNumber = parseInt(page) || 1;
    const limitOptions = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitOptions;

    try {
        const blogs = await Tweet.find()
            .sort(sortOption)
            .skip(skip)
            .limit(limitOptions);

        const totalBlogs = await Tweet.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limitOptions);

        return res.status(200).json(new ApiResponse(200, {
            page: pageNumber,
            limit: limitOptions,
            totalPages,
            totalBlogs,
            blogs
        }, "Latest Tweets Fetched Successfully"));
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }

})

const updateeditblogs = asyncHandeler(async (req, res) => {
    const _id = req.params.id;

    try {
        const lastblog = await Tweet.findById(_id);
        if (!lastblog) {
            return res
                .status(404)
                .json(new ApiError(404, {}, "This Tweet Not Found"));
        }

        // check the owner and current user is same or not 
        const verifyowner = verifypostowner(lastblog.createdBy._id, req.user._id)

        if (!verifyowner) {
            return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Blog"))
        }

        const profileImgPath = req.files?.tweetthumbnail?.[0]?.path;
        const { content } = req.body;

        // Initialize blogsdata with the necessary fields
        const blogsdata = {
            content,
            createdBy: {
                _id: req.user._id,
                username: req.user.username,
                profileimg: req.user.avatar.url,
            }
        };

        if (profileImgPath) {
            const uploadedImage = await uploadOnCloudinary(profileImgPath);

            if (lastblog && lastblog.coverImageURL && lastblog.coverImageURL.public_id) {
                await deletefromcloudinary(lastblog.coverImageURL.public_id);
            }

            if (!uploadedImage) {
                return res.status(500).json(new ApiError(500, {}, "Failed to upload image"));
            }

            blogsdata.coverImageURL = {
                url: uploadedImage.url,
                public_id: uploadedImage.public_id
            };
        }

        const updatedblog = await Tweet.findByIdAndUpdate(_id, blogsdata, { new: true });

        if (!updatedblog) {
            return res.status(404).json(new ApiError(404, {}, "Tweet Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, updatedblog, "Tweet Edited Successfully And Updated"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});

const deleteblogs = asyncHandeler(async (req, res) => {
    const _id = req.params.id;

    try {
        // checking for user then 
        const lastblog = await Tweet.findById(_id);
        if (!lastblog) {
            return res
                .status(404)
                .json(new ApiError(404, {}, "This Tweet Not Found"));
        }

        // check the owner and current user is same or not 
        const verifyowner = verifypostowner(lastblog.createdBy._id, req.user._id)

        if (!verifyowner) {
            return res.status(401).json(new ApiError(401, {}, "You Are Not The Owner Of This Blog"))
        }

        const blogsresult = await Tweet.findByIdAndDelete(_id);
        if (!blogsresult) {
            return res.status(404).json(new ApiResponse(404, {}, "Some Error Occerd While Deleteing Video"));
        }
        const resdeletefromcloudinary = await deletefromcloudinary(blogsresult?.coverImageURL?.public_id);
        return res.status(200).json(new ApiResponse(200, {}, "Blog Deleted Successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});

const handlegetindividualblog = asyncHandeler(async (req, res) => {
    const _id = req.params.id;
    try {
        const blog = await Tweet.findById(_id);

        if (!blog) {
            return res.status(404).json(new ApiError(404, {}, "Your Requested Tweet Is Not Found"));
        }

        return res.status(200).json(new ApiResponse(200, blog, "Tweet Fetched Successfully"));
    } catch (error) {
        console.error(error);
        return res.status(500).json(new ApiError(500, {}, "Internal Server Error Please Try Again"));
    }
});

export {
    handleaddblogs,
    getblogsbasic,
    updateeditblogs,
    deleteblogs,
    handlegetindividualblog,
    getblogsAdv,
};
