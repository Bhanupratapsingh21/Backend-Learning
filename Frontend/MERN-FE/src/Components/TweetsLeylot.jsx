
function TweetsLayout({ tweetsdata }) {

    return (
        <div className="flex-col -ml-4 px-0 py-1 -mt-5 sm:pl-0 sm:gap-4 items-center flex justify-center">
            {tweetsdata?.map((blog) => {
                const date = blog.createdAt.slice(0, 10)
                console.log(blog.likedByCurrentUser)
                return (
                    <div key={blog._id} class="dark:bg-black dark:shadow-gray-800 shadow-md sm:rounded-md bg-white">
                        <div class="bg-white dark:bg-black w-[100vw] sm:w-96 sm:border-transparent border-t rounded-sm ">
                            <div class="flex items-center px-4 py-3">
                                <img class="h-8 w-8 rounded-full " src={blog.createdBy.profileimg} />
                                <div class="ml-3 ">
                                    <span class="text-sm font-semibold antialiased block leading-tight">{blog.createdBy.username}</span>
                                    <span class="text-gray-600 dark:text-gray-400 text-xs block">On {date}</span>
                                </div>
                                <div className="flex justify-end items-end w-[70vw]">
                                    <button
                                        class="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-2 py-1 text-sm hover:border-[#fff] cursor-pointer transition"
                                    >
                                        Read More
                                    </button>
                                </div>


                            </div>
                            <div className="h-[340px] border-t border-b border-y-gray-600 grid items-center max-w-[100vw] sm:max-h-[380px]">
                                <img className="aspect-square max-h-[330px]" src={blog.coverImageURL.url} alt="dwa" />
                            </div>
                            <div class="flex items-center justify-between mx-4 mt-3 mb-2">
                                <div class="flex justify-center items-center">
                                    {
                                        blog.likedByCurrentUser ? (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    version="1.1"
                                                    height="24"
                                                    viewBox="0 0 256 256"
                                                    xmlSpace="preserve"
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
                                                <svg fill="#262626" className="dark:fill-white" height="24" viewBox="0 0 48 48" width="24"><path fill="red-600" d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                            </>
                                        ) 
                                    }


                                    <div class="font-semibold ml-4 text-sm">{blog.likeCount} likes</div>
                                </div>

                            </div>
                            <div className="font-semibold  text-sm h-10 overflow-hidden mx-4 mt-2 mb-4"><p className="w-68">{blog.content}dwdawdawdwdwdwdwdwwdadwadwdadawdjndjnwakjndkjawndjnkjdnakwjjdajwndkjnkdjnkajdnjandkjnwkdnkwjd</p></div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default TweetsLayout;
