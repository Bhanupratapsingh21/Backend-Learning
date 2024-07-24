import { Navigate, useNavigate } from "react-router"

function VideosLeyout({ videodata }) {
    const navigate = useNavigate();
    // console.log(videodata.length)
    const handlenavigation = (videoid) => {
        navigate(`/video/${videoid}`)
    }
    return (
        <>
            <div className="grid  px-0 py-1 sm:pl-0 w-max sm:gap-4 justify-center grid-cols-1 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 ">
                {
                    videodata.map((video) => {
                        // console.log(video)
                        return (
                            <div onClick={() => handlenavigation(video._id)} key={video._id}>
                                <div className="flex border shadow-md dark:border-gray-900 flex-col dark:bg-black sm:w-[320px] w-[100vw] -ml-4 sm:ml-0 pb-3 sm:rounded-xl">
                                    <div><img className="w-full shadow-md sm:rounded-xl h-48" src={video.thumbnail} onError={(e) => e.target.src = 'http://res.cloudinary.com/dhvkjanwa/image/upload/v1720186851/zrirfteydyrh79xaua3q.jpg'} /></div>
                                    <div className="flex items-center pt-2  px-4 h-20 space-x-2">
                                        <div className="flex" ><img className="h-10 w-10 rounded-full" src={video.owneravatar} alt="" /></div>
                                        <div className="space-y-1 flex flex-col justify-center w-[245px] left">
                                            <div className="dark:text-white text-md text-black overflow-hidden max-h-[50px] -mb-1">{video.tittle}</div>
                                            <div className="flex dark:text-gray-400 text-md items-center">
                                                <div className="w-[115px] h-[25px] overflow-hidden ">{video.ownerusername}</div>
                                                <div className=""> • </div>
                                                <div className="pl-2 h-[25px] ">{video.views} views</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default VideosLeyout