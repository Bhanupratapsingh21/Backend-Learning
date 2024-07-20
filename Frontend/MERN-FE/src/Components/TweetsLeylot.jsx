import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function Tweet({ tweet, status, toast }) {
    const date = tweet.createdAt.slice(0, 10);
    const [subscribe, setSubscribe] = useState(tweet.subscribedByCurrentUser);
    const [likeCount, setLikeCount] = useState(tweet.likeCount);
    const [likeState, setLikeState] = useState(tweet.likedByCurrentUser);

    const toggleSubscribe = async () => {
        if (status) {
            try {
                setSubscribe((prevSubscribe) => !prevSubscribe);
                await axios.post(
                    `${import.meta.env.VITE_URL}/api/v1/subscriptions/addSubscriptions/${tweet.createdBy._id}`,
                    {},
                    { withCredentials: true }
                );
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Error while subscribing. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "Error",
                description: "Please log in before subscribing.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const toggleLike = useCallback(async () => {
        if (status) {
            try {
                setLikeCount((prevLikeCount) => (likeState ? prevLikeCount - 1 : prevLikeCount + 1));
                setLikeState((prevLikeState) => !prevLikeState);
                const response = await axios.get(
                    `${import.meta.env.VITE_URL}/api/v1/like/tweet/${tweet._id}`,
                    { withCredentials: true }
                );
                //console.log(response)
            } catch (error) {
                //console.log(error)
                toast({
                    title: "Error",
                    description: "Error while liking the tweet. Please try again.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "Error",
                description: "Please log in before liking the tweet.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [status, tweet._id, likeState, toast]);

    return (
        <div key={tweet._id} className="dark:bg-black sm:rounded-md bg-white">
            <div className="bg-white dark:bg-black w-[100vw] sm:w-96 -mt-0 border-y-gray-600">
                <div className="flex items-center px-4 py-3">
                    <img className="h-8 w-8 rounded-full" src={tweet.createdBy.profileimg} alt="Profile" />
                    <div className="ml-3">
                        <span className="text-sm font-semibold antialiased block leading-tight">{tweet.createdBy.username}</span>
                        <span className="text-gray-600 dark:text-gray-400 text-xs block">On {date}</span>
                    </div>
                    <div className="flex justify-end items-end w-[70vw]">
                        <button
                            onClick={toggleSubscribe}
                            className={`${subscribe ? 'bg-[#292929]' : 'bg-red-600'
                                } border-2 dark:border-[#3e3e3e] rounded-lg text-white px-2 py-1 text-sm hover:border-[#fff] cursor-pointer transition`}
                        >
                            {subscribe ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </div>
                </div>
                <div className="border-t border-b border-y-gray-600 grid items-center max-w-[100vw]">
                    <img className="aspect-w-16  object-cover " src={tweet.coverImageURL.url} alt="Tweet" />
                </div>
                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                    <div className="flex justify-center items-center">
                        <button onClick={toggleLike}>
                            {likeState ? (
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 256 256">
                                    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                        <path
                                            d="M 45 10.715 c 4.77 -4.857 11.36 -7.861 18.64 -7.861 C 78.198 2.854 90 14.87 90 29.694 c 0 35.292 -36.812 34.15 -45 57.453 C 36.812 63.843 0 64.986 0 29.694 C 0 14.87 11.802 2.854 26.36 2.854 C 33.64 2.854 40.23 5.858 45 10.715 z"
                                            style={{ fill: 'rgb(211,28,28)' }}
                                            transform="matrix(1 0 0 1 0 0)"
                                        />
                                    </g>
                                </svg>
                            ) : (
                                <svg fill="#262626" className="dark:fill-white" height="24" viewBox="0 0 48 48" width="24">
                                    <path
                                        fill="red-600"
                                        d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
                                    ></path>
                                </svg>
                            )}
                        </button>
                        <div className="font-semibold ml-4 text-sm">{likeCount} likes</div>
                    </div>
                </div>
                <div className="font-semibold text-sm h-10 overflow-hidden mx-4 mt-2 mb-4">
                    <p className="w-68">{tweet.content}</p>
                </div>
            </div>
        </div>
    );
}

function TweetsLayout({ tweetsdata }) {
    const { status, userdata } = useSelector((state) => state.auth);
    const toast = useToast();

    return (
        <div className="flex flex-col px-0 py-1 -mt-5 sm:pl-0 sm:gap-4 items-center justify-center">
            {tweetsdata?.map((tweet) => {
                console.log(tweet);
                return (
                    <Tweet key={tweet._id} tweet={tweet} status={status} toast={toast} />
                )
            }
            )}
        </div>
    );
}

export default TweetsLayout;
