import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/Videoplayer";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux'
import {
    useToast,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Spinner,
} from "@chakra-ui/react";
import CommentsLayout from "../Components/Comments.leylot";
import LoadingComment from "../Components/Commentsloader";
import Headertwo from "../Components/Header2";
function IndividualVideo() {
    const toast = useToast();
    // for comments 
    const [comments, setComments] = useState([]);
    const [commentsloading, setcommentsLoading] = useState(true);
    const [commentserror, setcommentsError] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const observer = useRef();
    const lastCommentElementRef = useRef();
    //

    const [commenttext, setcommenttext] = useState("")

    const { status, userdata } = useSelector((state) => state.auth);
    const { videoid } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Subscribe, setSubscribe] = useState(false)
    const [viewcomment, setviewcomments] = useState(false)
    const [subscount, setsubscount] = useState(0)
    const [likecount, setlikecount] = useState(0);
    const [likestate, setlikestate] = useState(false);
    const [video, setVideo] = useState({});
    const [commentpostloading, setcommentpostloading] = useState(false);
    const fetchComments = async (page) => {
        try {
            setcommentsLoading(true);
            const response = await axios.get(`http://localhost:4000/api/v1/comment/getcomments/${videoid}?limit=10&page=${page}`, { withCredentials: true });
            const commentsData = response.data.data.Comments;
            //console.log(commentsData)
            setComments(prevComments => [...prevComments, ...commentsData]);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error(error);
            setcommentsError(true);
        } finally {
            setcommentsLoading(false);
        }
    };



    useEffect(() => {
        if (commentsloading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && page < totalPages) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (lastCommentElementRef.current) {
            observer.current.observe(lastCommentElementRef.current);
        }
        return () => {
            if (observer.current) observer.current.disconnect();
        }
    }, [commentsloading, page, totalPages]);



    // Function to extract Cloudinary public ID from the video URL
    const extractIdFromUrl = (url) => {
        // Regex to capture the public ID from the URL
        const regex = /\/(?:v\d+\/)?([^\/]+)\.[a-zA-Z0-9]+$/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const postcomments = async () => {
        setcommentsLoading(false);
        setcommentpostloading(true)
        setcommentsError(false);
        try {


            setcommenttext("");
            const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/comment/postcomment/Video/${videoid}`, { content: commenttext }, { withCredentials: true });

            //console.log(response.data.data);
            const comment = {
                content: response.data.data.content,
                _id: response.data.data._id,
                user: {
                    ...userdata
                }
            }
            setComments([...comments, comment])// console.log(comments);
        } catch (error) {
            console.log(error)
            setcommentsError(true);
        } finally {
            setcommentpostloading(false)
            setcommentsLoading(false);
        }
    }

    const getVideo = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/videos/getvideo/${videoid}`, { withCredentials: true });
            //console.log(response)
            const videoData = response.data.data;
            //console.log(videoData)
            videoData.video.videoFile = extractIdFromUrl(videoData?.video.videoFile);
            setVideo(videoData);

            setlikestate(videoData.likebyuserstate);
            setlikecount(videoData.LikeCount);
            setsubscount(videoData.totalSubs);
            setSubscribe(videoData.channelsubscribestate);
            //console.log(videoData.channelsubscribestate);
        } catch (error) {
            //console.error(error);
            setError(error.response?.data?.errors || 'An unexpected error occurred.');
            toast({
                title: error.response?.data?.errors || "An unexpected error occurred.",
                description: "pls Try Again.",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };



    const togglesubscribe = async () => {
        if (status) {
            try {
                setsubscount(prevsubscount => Subscribe ? prevsubscount - 1 : prevsubscount + 1);

                setSubscribe(!Subscribe)

                const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/subscriptions/addSubscriptions/${video.video.owner}`, {}, { withCredentials: true })
                // console.log(response);
            } catch (error) {
                toast({
                    title: error.response?.data?.errors || "Error While Subscribeing Pls Login Again",
                    description: "pls Try Again.",
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                });
                // console.log(error)
            }
        } else {
            toast({
                title: "Pls Login Before Subscribeing",
                description: "Login || Register Pls",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
        }
    }
    const togglelikevideo = async () => {
        if (status) {
            try {
                setlikecount(prevlikecount => likestate ? prevlikecount - 1 : prevlikecount + 1);

                setlikestate(!likestate)
                const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/like/video/${video.video._id}`, { withCredentials: true })
                //console.log(response);
            } catch (error) {
                toast({
                    title: error.response?.data?.errors || "Error While Like Video Pls & Login Again",
                    description: "pls Try Again.",
                    status: "error",
                    duration: 3000,
                    position: "top",
                    isClosable: true,
                });
                // console.log(error)
            }
        } else {
            toast({
                title: "Pls Login Before Subscribeing",
                description: "Login || Register Pls",
                status: "error",
                duration: 3000,
                position: "top",
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        if (viewcomment) {
            fetchComments();

        }
    }, [page, viewcomment]);

    useEffect(() => {
        getVideo();
    }, [videoid, status]);

    return (
        <>
            <Headertwo />
            <div className="dark:text-white mb-10 text-black">

                {loading && <div className="flex justify-center text-lg items-center">
                    <div className='flex w-[100vw]  text-white dark:bg-black justify-center items-center'>
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                            <h2 className="text-black dark:text-white mt-4">Loading...</h2>
                            <p className="text-black dark:text-zinc-400">
                                Your Adventure is About To Begin
                                <h3>Jai Shri Ram</h3>
                            </p>
                        </div>
                    </div>
                </div>}
                {error && <div className="flex justify-center text-lg items-center">Error: {error}</div>}
                {!loading && !error && video && (
                    <>
                        <div className="lg:flex ">
                            <VideoPlayer videopublicId={video.video.videoFile} thumbnail={video.video.thumbnail} />
                            <div>
                                {
                                    userdata?._id === video.video.owner && (
                                        <div>
                                            <div class="flex justify-around mt-2 p-4 sm:w-[50vw] xl:w-80 lg:w-[25vw] items-center py-3">
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
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="hidden lg:block xl:absolute z-50 xl:w-80 lg:w-[25vw] w-80 m-4">
                                    <div className="flex text-lg justify-between px-4 h-10 items-center cursor-pointer" onClick={() => {
                                        if (status === true) {
                                            setviewcomments(true)
                                        } else {
                                            toast({
                                                title: "Pls Login/Signup To View Comments",
                                                status: "info",
                                                duration: "2s",
                                                isClosable: true,

                                            })
                                        }
                                    }} >
                                        <h2>Comments</h2>
                                        <div>
                                            <svg viewBox="0 0 360 360" className="mt-1 dark:fill-white" width={15} xml:space="preserve">
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        id="XMLID_225_"
                                                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </div>

                                    </div>
                                    <div class="relative xl:w-80 mb-2 lg:w-[25vw] w-80 mt-2">
                                        <input
                                            type="text"
                                            placeholder="Add Comment"
                                            class="block  lg:w-[24vw] w-80   rounded-2xl border dark:text-white  border-neutral-300 bg-transparent py-4 pl-6  text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                                            onChange={(e) => setcommenttext(e.target.value)}
                                            value={commenttext}
                                        />
                                        <div class="absolute inset-y-1 right-4 flex justify-end">
                                            <button
                                                type="submit"
                                                onClick={postcomments}
                                                aria-label="Submit"
                                                class="flex aspect-square h-full items-center justify-center rounded-xl dark:bg-neutral-950 dark:text-white transition hover:bg-neutral-800"
                                            >
                                                {
                                                    commentpostloading ? (
                                                        <Spinner size={"sm"} />
                                                    ) : (
                                                        <svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
                                                            <path
                                                                fill="currentColor"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                                                            ></path>
                                                        </svg>
                                                    )
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        viewcomment && (
                                            <>
                                                <div className="h-[320px] absolute  overflow-y-scroll">
                                                    <CommentsLayout commentData={comments} />
                                                    {commentsloading && <LoadingComment totalNo={9} />}
                                                    <div ref={lastCommentElementRef} />
                                                    {commentserror && <div className="flex justify-center w-72 text-center items-center">This Video Don't Have Any Comments</div>}
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            </div>

                        </div>
                        <div className=" w-[100vw] max-h-max bg-white dark:bg-black -ml-4 sm:w-[50vw] mt-1 ">
                            <div className="px-2 py-0">
                                <div>
                                    <Accordion className="border-transparent -pt-7 hover:bg-white dark:hover:bg-black -ml-3" allowToggle={true}>
                                        <AccordionItem>
                                            <h2>
                                                <AccordionButton>
                                                    <Box as='span' flex='1' textAlign='left'>
                                                        <h2 className="text-xl w-[90vw] sm:w-96  overflow-hidden">{video.video.tittle}</h2>
                                                        <h2 className="text-sm text-gray-800 dark:text-gray-400">{video.video.views} Views</h2>

                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel>
                                                <h2 className="text-sm -mt-2 w-[97vw] sm:w-96  overflow-hidden">Upload At {video.video.createdAt.slice(0, 10)}</h2>
                                                <h2>Description : </h2>
                                                <h2 className="text-sm text-gray-800 dark:text-white">{video.video.description}</h2>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>


                                </div>
                                <div>
                                    <div className="flex justify-left items-center pt-1 pb-2">
                                        <img className="w-10 rounded-full" src={video?.channel?.avatar?.url} alt="dwa" />
                                        <div className="px-2" >
                                            <h2 className="text-md " >{video.channel.username}</h2>
                                            <h2 className="text-sm text-gray-800 dark:text-gray-400">{subscount} Subscriber</h2>
                                        </div>
                                        <div className="ml-3 sm:ml-0">
                                            {
                                                Subscribe ? (
                                                    <button onClick={togglesubscribe} class="cursor-pointer group  flex gap-1.5 mr-2 px-1 sm:px-5 py-2 bg-black  text-[#f1f1f1] rounded-3xl bg-opacity-70 transition font-semibold shadow-md">
                                                        Subscribed
                                                    </button>
                                                ) : (
                                                    <button onClick={togglesubscribe} class="cursor-pointer group  flex gap-1.5 mr-1 sm:mr-5 sm:px-5 px-2 py-2 bg-red-700 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
                                                        Subscribe
                                                    </button>
                                                )
                                            }
                                        </div>
                                        <div class="flex ml-3 sm:ml-0 justify-center items-center">
                                            {
                                                likestate ? (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                                            version="1.1"
                                                            height="24"
                                                            viewBox="0 0 256 256"
                                                            xmlSpace="preserve"
                                                            onClick={togglelikevideo}
                                                        >
                                                            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                                                <path
                                                                    d="M 45 10.715 c 4.77 -4.857 11.36 -7.861 18.64 -7.861 C 78.198 2.854 90 14.87 90 29.694 c 0 35.292 -36.812 34.15 -45 57.453 C 36.812 63.843 0 64.986 0 29.694 C 0 14.87 11.802 2.854 26.36 2.854 C 33.64 2.854 40.23 5.858 45 10.715 z"
                                                                    style={{ fill: 'rgb(211,28,28)' }}
                                                                    transform="matrix(1 0 0 1 0 0)"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg fill="#262626" onClick={togglelikevideo} className="dark:fill-white" height="24" viewBox="0 0 48 48" width="24"><path fill="red-600" d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                                    </>
                                                )
                                            }


                                            <div class="font-semibold ml-2 sm:ml-4 text-sm">{likecount} likes</div>
                                        </div>
                                    </div>
                                    <div className="lg:hidden mt-5 z-50 -ml-2 sm:w-80 w-[100vw]">

                                        <div className="flex text-lg justify-between px-4 h-10 items-center cursor-pointer" onClick={() => {
                                            if (status === true) {
                                                setviewcomments(true)
                                            } else {
                                                toast({
                                                    title: "Signup & Login To Enjoy Comments",
                                                    status: "error",
                                                    duration: 3000,
                                                    position: "top",
                                                    isClosable: true,
                                                })
                                            }
                                        }} >
                                            <h2>Comments</h2>
                                            <div>
                                                <svg viewBox="0 0 360 360" className="mt-1 dark:fill-white" width={15} xml:space="preserve">
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path
                                                            id="XMLID_225_"
                                                            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                                        ></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="relative bottom-1 mb-2 mt-2">
                                            <input
                                                type="text"
                                                placeholder="Add Comment"
                                                class="block sm:w-80 w-[99vw]  rounded-2xl border dark:text-white  border-neutral-300 bg-transparent py-4 pl-6  text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                                                onChange={(e) => setcommenttext(e.target.value)}
                                                value={commenttext}
                                            />
                                            <div class="absolute inset-y-1 right-6 flex justify-end">
                                                <button
                                                    type="submit"
                                                    onClick={postcomments}
                                                    aria-label="Submit"
                                                    class="flex aspect-square h-full items-center justify-center rounded-xl dark:bg-neutral-950 dark:text-white "
                                                >
                                                    {
                                                        commentpostloading ? (
                                                            <Spinner size={"sm"} />
                                                        ) : (
                                                            <svg viewBox="0 0 16 6" aria-hidden="true" class="w-4">
                                                                <path
                                                                    fill="currentColor"
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                                                                ></path>
                                                            </svg>
                                                        )
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                viewcomment && (
                                                    <>
                                                        <div className=" flex flex-col justify-center items-left  dark:bg-black bg-white p-2 overflow-y-scroll">
                                                            <CommentsLayout commentData={comments} />
                                                            {commentsloading && <LoadingComment totalNo={9} />}
                                                            <div ref={lastCommentElementRef} />
                                                            {commentserror && <div className="flex text-center w-[90vw] sm:w-max justify-center items-center">This Video Don't Have Any Comments</div>}

                                                        </div>
                                                    </>
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
        </>
    );
}

export default IndividualVideo;