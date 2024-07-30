import { Routes, Route } from "react-router-dom";
import Home from "../Screen's/Home.jsx";
import Tweets from "../Screen's/Tweets.jsx";
import Playlist from "../Screen's/Playlist.jsx";
import Subscription from "../Screen's/Subscriptions.jsx";
import Videos from "../Screen's/Videos.jsx";
import Userwatchhistory from "../Screen's/Watch-History.jsx"
import Profile from "../Screen's/Profile.jsx";
import IndividualVideo from "../Screen's/Individual.Video.jsx";
import Upload from "../Screen's/Uploadvideo.jsx";
import Editvideo from "../Screen's/VideoEditScreen.jsx";
import Userchannalstatus from "../Screen's/UserChannalstatus.jsx";
import Userprofile from "../Screen's/UserProfile.jsx";
import EdituserProfile from "../Screen's/Edit-userprofile.jsx";
import IndiPlaylist from "../Screen's/Individualplaylist.jsx";
function AllRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tweets" element={<Tweets />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/user/editprofile" element={<Profile />} />
            <Route path="/userchannelstatus" element={<Userchannalstatus />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/user/editprofile" element={<EdituserProfile />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/editvideo/:videoid" element={<Editvideo />} />
            <Route path="/playlist/:playlistid" element={<IndiPlaylist />} />
            <Route path="/user/userprofile/:username" element={<Userprofile />} />
            <Route path="/video/:videoid" element={<IndividualVideo />} />
            <Route path="/watch-history" element={<Userwatchhistory />} />
        </Routes>
    );
}

export default AllRoutes;