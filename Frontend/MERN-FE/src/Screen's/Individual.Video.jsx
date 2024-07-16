import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/Videoplayer";

function IndividualVideo() {
    const { videoid } = useParams();
    const publicId = "ytdtlzoggmgkblc3of98"; // Replace with your Cloudinary public ID
    const width = 240;
    const height = 160;

    return (
        <>
            <VideoPlayer publicId={publicId} width={width} height={height} />
            {/* Additional content */}
        </>
    );
}

export default IndividualVideo;



// link={"http://res.cloudinary.com/dhvkjanwa/video/upload/v1720186956/ytdtlzoggmgkblc3of98.avi"}