import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/Videoplayer";
import { useEffect, useState } from "react";
import axios from 'axios';

function IndividualVideo() {
    const { videoid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Subscribe,setSubscribe] = useState(false)
    const [video, setVideo] = useState({});

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
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/videos/getvideo/${videoid}`,{ withCredentials: true });
            console.log(response)
            const videoData = response.data.data;
            videoData.video.videoFile = extractIdFromUrl(videoData?.video.videoFile);
            setVideo(videoData);
            setSubscribe(videoData.channelsubscribestate);

            console.log(videoData.channelsubscribestate)
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.errors || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const togglesubscribe = async()=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/subscriptions/addSubscriptions/${video.video.owner}`,{},{withCredentials : true})
            setSubscribe(!Subscribe)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getVideo();
    }, [videoid]);

    return (
        <div className="dark:text-white text-black">
            {loading && <div className="flex h-screen justify-center text-lg items-center">
                <div className='flex w-[100vw] text-white bg-black justify-center items-center'>
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                        <h2 className="text-white mt-4">Loading...</h2>
                        <p className="text-zinc-400 dark:text-zinc-400">
                            Your Adventure is About To Begin
                            <h3>Jai Shri Ram</h3>
                        </p>
                    </div>
                </div>
            </div>}
            {error && <div className="flex justify-center text-lg items-center">Error: {error}</div>}
            {!loading && !error && video && (
                <>
                    <div className="sm:flex">
                        <VideoPlayer videopublicId={video.video.videoFile} thumbnail={video.video.thumbnail} />
                        <div><div class="flex justify-around items-center py-3">
                            <div class="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                <svg class="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                <button class="font-semibold text-sm text-green-700">Edit</button>
                            </div>
                            <div class="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                                <svg class="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                <button class="font-semibold text-sm text-red-700">Delete</button>
                            </div>
                        </div></div>
                    </div>
                    <div className="z-51 w-[100vw] -ml-4 sm:w-[50vw] mt-1 absolute">
                        <div className="p-2">
                            <div>
                                <h2 className="text-xl overflow-hidden">{video.video.tittle}</h2>
                            </div>
                            <div>
                                <div className="flex justify-left items-center py-2">
                                    <img className="w-10 rounded-full" src={video?.channel?.avatar?.url} alt="dwa" />
                                    <div className="px-2" >
                                        <h2 className="text-md " >{video.channel.username}</h2>
                                        <h2 className="text-sm text-gray-400">{video.totalSubs} Subscriber</h2>
                                    </div>
                                    <div className="">
                                        {
                                            Subscribe ? (
                                            <button onClick={togglesubscribe} class="cursor-pointer group relative flex gap-1.5 px-5 py-2 bg-black  text-[#f1f1f1] rounded-3xl bg-opacity-70 transition font-semibold shadow-md">
                                                Subscribed
                                            </button>
                                            ) : (
                                            <button onClick={togglesubscribe} class="cursor-pointer group relative flex gap-1.5 px-5 py-2 bg-red-500 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                                                Subscribe
                                            </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </div >
    );
}

export default IndividualVideo;
