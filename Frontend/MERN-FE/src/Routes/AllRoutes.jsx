import { Routes, Route } from "react-router-dom";
import Home from "../Screen's/Home.jsx";
import Tweets from "../Screen's/Tweets.jsx";
import Playlist from "../Screen's/Playlist.jsx";
import Subscription from "../Screen's/Subscriptions.jsx";
import Videos from "../Screen's/Videos.jsx";
import Userwatchhistory from "../Screen's/Watch-History.jsx"
import Profile from "../Screen's/Profile.jsx";
import IndividualVideo from "../Screen's/Individual.Video.jsx";
function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tweets" element={<Tweets/>} />
            <Route path="/playlist" element={<Playlist/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/subscription" element={<Subscription/>} />
            <Route path="/videos" element={<Videos/>} />
            <Route path="/video/:videoid" element={<IndividualVideo/>} />
            <Route path="/watch-history" element={<Userwatchhistory/>} />
        </Routes>
    );
}

export default AllRoutes;