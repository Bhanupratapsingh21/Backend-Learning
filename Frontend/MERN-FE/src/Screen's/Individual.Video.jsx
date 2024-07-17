import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/Videoplayer";
import { useEffect, useState } from "react";
import axios from 'axios';

function IndividualVideo() {
    const { videoid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [video, setVideo] = useState(null);

    // Function to extract Cloudinary public ID from the video URL
    const extractIdFromUrl = (url) => {
        // Regex to capture the public ID from the URL
        const regex = /\/(?:v\d+\/)?([^\/]+)\.[a-zA-Z0-9]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const getVideo = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/videos/getvideo/${videoid}`);
            const videoData = response.data.data.video;
            videoData.videoFile = extractIdFromUrl(videoData.videoFile);
            setVideo(videoData);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.errors || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getVideo();
    }, [videoid]);

    return (
        <div className="dark:text-white text-black">
            {loading && <div className="flex justify-center text-lg items-center">Loading...</div>}
            {error && <div className="flex justify-center text-lg items-center">Error: {error}</div>}
            {!loading && !error && video && (
                <>
                    <VideoPlayer videopublicId={video.videoFile} thumbnail={video.thumbnail} />
                    <div className="z-50 absolute mt-[200px] sm:mt-[380px]">
                        <div className="border-t border-b">
                            <h2>{video.title}</h2>
                            <p>{video.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default IndividualVideo;
