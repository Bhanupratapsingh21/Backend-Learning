import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
function Playlist() {
    const [playlists, setplaylists] = useState([]);
    const { status, userdata } = useSelector((state) => state.auth)
    const toast = useToast();
    const getplaylist = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/playlist/getuserplaylist/${userdata?._id}`, { withCredentials: true })
            setplaylists(response.data.data)
        } catch (error) {
            console.log(error)
            if (error.response.data.statusCode === 404) {
                toast({
                    title: "You Dont Have Any Playlist's",
                    description: "Pls Create New Playlists",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
            } else {
                toast({
                    title: "Error While Getting Playlist",
                    description: "Pls Try Again",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                })
            }

        }
    }


    useEffect(() => {
        getplaylist();
    }, [userdata])

    return (
        <>
            <div class="min-h-screen p-2 sm:p-4 dark:bg-black text-black dark:text-white">
                <div className="flex w-[85vw] sm:w-[70vw] items-center justify-between">
                    <div>
                        <h2 class="sm:mt-6 mb-6 text-4xl sm:text-7xl font-bold text-gray-100">
                            Your Playlists
                        </h2>
                    </div>
                    <div>
                        <svg className="dark:fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18" height="25"><path d="M17,12c0,.553-.448,1-1,1h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1Zm7-7v14c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V5Z" /></svg>
                    </div>
                </div>
                <div class="max-h-screen overflow-y-auto">
                    <div class="mt-12">
                        <div class="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                            {
                                playlists.length >= 0 && (
                                    playlists.map((playlist) => (
                                        <div key={playlist._id} class="relative sm:w-[65vw] flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                                            <div class="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                                                <div>
                                                    <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">{playlist.name}</h6>
                                                    <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">{playlist.description}</h6>
                                                    <p class="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-4 w-4 text-blue-500">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                                        </svg>
                                                        <strong>{playlist.videos.length} Video's</strong> Total
                                                    </p>
                                                </div>
                                                <button aria-expanded="false" aria-haspopup="menu" id=":r5:" class="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                                                    <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currenColor" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                    <div class="text-blue-gray-600">
                        <footer class="py-2">
                            <div class="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                                <p class="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2024, made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="-mt-0.5 inline-block h-3.5 w-3.5">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                </svg> by <a href="https://url-shortner-mern-uetd.onrender.com/Js0GzP6A" target="_blank" class="transition-colors hover:text-blue-500">BPSS </a>For Project</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Playlist

/*
 <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                                <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                                        <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                                        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                                    </svg>
                                </div>
                                <div class="p-4 text-right">
                                    <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
                                    <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$53k</h4>
                                </div>
                                <div class="border-t border-blue-gray-50 p-4">
                                    <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                                        <strong class="text-green-500">+55%</strong>&nbsp;than last week
                                    </p>
                                </div>
</div>

*/