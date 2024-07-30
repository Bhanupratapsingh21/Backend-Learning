import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Spinner,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Headertwo from '../Components/Header2';
function PlaylistBlock({ playlist, getPlaylists }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [addPlaylistText, setAddPlaylistText] = useState({
        name: playlist.name,
        description: playlist.description
    });
    const [addPlaylistLoading, setAddPlaylistLoading] = useState(false);

    const addPlaylistTextHandle = (e) => {
        setAddPlaylistText({
            ...addPlaylistText,
            [e.target.name]: e.target.value
        });
    };

    const updatePlaylist = async (e) => {
        e.preventDefault();
        setAddPlaylistLoading(true);
        try {
            await axios.patch(`${import.meta.env.VITE_URL}/api/v1/playlist/updateplaylist/${playlist._id}`, addPlaylistText, { withCredentials: true });
            toast({
                title: "Playlist updated.",
                description: "Your playlist has been updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            getPlaylists();
            onClose();
        } catch (error) {
            toast({
                title: "Error updating playlist.",
                description: "There was an error updating your playlist. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        } finally {
            setAddPlaylistLoading(false);
        }
    };

    const deletePlaylist = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_URL}/api/v1/playlist/deleteplaylist/${playlist._id}`, { withCredentials: true });
            toast({
                title: "Playlist deleted.",
                description: "Your playlist has been deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            getPlaylists();
            onClose();
        } catch (error) {
            console.log(error)
            toast({
                title: "Error deleting playlist.",
                description: "There was an error deleting your playlist. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    return (
        <>
            <div key={playlist._id} className="relative sm:w-[65vw] flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
                    <Link to={`${playlist._id}`}>
                        <div>
                            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">{playlist.name}</h6>
                            <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">{playlist.description}</h6>
                            <p className="antialiased font-sans text-sm leading-normal flex items-center gap-1 font-normal text-blue-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4 text-blue-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                </svg>
                                <strong>{playlist.videos.length} Video's</strong> Total
                            </p>
                        </div>
                    </Link>
                    <button onClick={onOpen} aria-expanded="false" aria-haspopup="menu" id=":r5:" className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30" type="button">
                        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='dark:bg-black bg-white dark:text-white text-black'>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab>Edit Playlist</Tab>
                                <Tab>Delete Playlist</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex dark:bg-black bg-white dark:text-white text-black items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                                        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
                                            <div className="mb-2 flex justify-center"></div>
                                            <h2 className="text-center text-2xl font-bold leading-tight ">
                                                Edit Playlist
                                            </h2>
                                            <form onSubmit={updatePlaylist} className="mt-8">
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="text-base font-medium">
                                                            Playlist Name
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={addPlaylistTextHandle}
                                                                placeholder="Name"
                                                                type="text"
                                                                name='name'
                                                                value={addPlaylistText.name}
                                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-base font-medium">
                                                                Description
                                                            </label>
                                                        </div>
                                                        <div className="mt-2">
                                                            <input
                                                                onChange={addPlaylistTextHandle}
                                                                placeholder="Description"
                                                                name='description'
                                                                type="text"
                                                                value={addPlaylistText.description}
                                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {
                                                            addPlaylistLoading ? (
                                                                <div className="inline-flex w-full items-center justify-center rounded-md dark:bg-white bg-black dark:text-black text-white px-3.5 py-2.5 font-semibold leading-7">
                                                                    <Spinner size={"sm"} />
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    className="inline-flex w-full items-center justify-center rounded-md dark:bg-white bg-black dark:text-black text-white px-3.5 py-2.5 font-semibold leading-7"
                                                                    type='submit'
                                                                >
                                                                    Update
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <button
                                        className="inline-flex w-full items-center justify-center rounded-md dark:bg-white bg-black dark:text-black text-white px-3.5 py-2.5 font-semibold leading-7"
                                        onClick={deletePlaylist}
                                    >
                                        Delete Playlist
                                    </button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const { status, userdata } = useSelector((state) => state.auth);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [addPlaylistText, setAddPlaylistText] = useState({
        name: "",
        description: ""
    });

    const addplaylisttexthandle = (e) => {
        setAddPlaylistText({
            ...addPlaylistText,
            [e.target.name]: e.target.value
        })
    }



    const [addPlaylistLoading, setAddPlaylistLoading] = useState(false);

    const addplaylist = async (e) => {
        e.preventDefault()
        if (addPlaylistText.name === "" || addPlaylistText.description === "") {
            return toast({
                title: "Kuch Likhe Toh Sahi Bhai",
                description: "Please Give Name & Description atleast.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }

        if (status) {
            setAddPlaylistLoading(true)
            try {
                const response = await axios.post(`${import.meta.env.VITE_URL}/api/v1/playlist/newplaylist`, addPlaylistText, { withCredentials: true });
                getPlaylist();
                toast({
                    title: "Playlist Created Successfully",
                    description: "Playlist Created",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });

            } catch (error) {
                console.log(error);
                toast({
                    title: "Error While Createing Playlist",
                    description: "Please Try Again",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });

            }
            setAddPlaylistLoading(false)
            onClose();
            setAddPlaylistText({
                name: "",
                description: "",
            })
        } else {
            toast({
                title: "Pls Login Or Signup",
                description: "Pls Login Or Signup to Create a New Playlist",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    }
    const getPlaylist = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/api/v1/playlist/getuserplaylist/${userdata?._id}`, { withCredentials: true });
            setPlaylists(response.data.data);
        } catch (error) {
            console.log(error);
            if (error.response.data.statusCode === 404) {
                setPlaylists([])
                toast({
                    title: "You Don't Have Any Playlist's",
                    description: "Please Create a New Playlist",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: "Error While Getting Playlist",
                    description: "Please Try Again",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top"
                });
            }
        }
    };

    useEffect(() => {
        if (userdata) {
            getPlaylist();
        }
    }, [userdata, status]);

    return (
        <>
            <Headertwo />
            <div className="max-h-screen p-2 sm:p-4 dark:bg-black text-black dark:text-white">
                <div className="flex sm:mt-6 mt-6 mb-6 w-[85vw] sm:w-[70vw] items-center justify-between">
                    <div>
                        <h2 className="text-4xl sm:text-7xl font-bold text-gray-100">
                            Your Playlists
                        </h2>
                    </div>
                    <div>
                        <svg onClick={onOpen} className="dark:fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28" height="35">
                            <path d="M17,12c0,.553-.448,1-1,1h-3v3c0,.553-.448,1-1,1s-1-.447-1-1v-3h-3c-.552,0-1-.447-1-1s.448-1,1-1h3v-3c0-.553,.448-1,1-1s1,.447,1,1v3h3c.552,0,1,.447,1,1Zm7-7v14c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V5Z" />
                        </svg>
                    </div>
                </div>
                <div className="max-h-screen overflow-y-auto">
                    <div className="mt-12">
                        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                            {playlists.length >= 0 && (
                                playlists.map((playlist) => (
                                    <PlaylistBlock key={playlist._id} getPlaylists={getPlaylist} playlist={playlist} />
                                ))
                            )
                            }
                            {!status && <h2 className="text-lg text-center sm:text-xl font-bold text-gray-100">
                                Login To View Playlists
                            </h2>}
                        </div>
                    </div>
                    <div className="text-blue-gray-600">
                        <footer className="py-2">
                            <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
                                <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">© 2024, made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="-mt-0.5 inline-block h-3.5 w-3.5">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                                </svg> by <a href="https://url-shortner-mern-uetd.onrender.com/Js0GzP6A" target="_blank" className="transition-colors hover:text-blue-500">BPSS </a>For Project</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='dark:bg-black bg-white dark:text-white rounded-3xl text-black'>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div
                            class="flex dark:bg-black bg-white dark:text-white text-black items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8"
                        >
                            <div class="xl:mx-auto xl:w-full shadow-md p-2 xl:max-w-sm 2xl:max-w-md">
                                <div class="mb-2 flex justify-center"></div>
                                <h2 class="text-center text-2xl font-bold leading-tight ">
                                    Create Playlist
                                </h2>
                                <form onSubmit={addplaylist} class="mt-8">
                                    <div class="space-y-5">
                                        <div>
                                            <label class="text-base font-medium">
                                                Playlist Name
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    onChange={addplaylisttexthandle}
                                                    placeholder="Name"
                                                    type="text"
                                                    name='name'
                                                    value={addPlaylistText.name}
                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between">
                                                <label class="text-base font-medium">
                                                    Description
                                                </label>
                                            </div>
                                            <div class="mt-2">
                                                <input
                                                    onChange={addplaylisttexthandle}
                                                    placeholder="Description"
                                                    name='description'
                                                    type="text"
                                                    value={addPlaylistText.description}
                                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                addPlaylistLoading ? (
                                                    <div class="inline-flex w-full items-center justify-center rounded-md dark:bg-white bg-black dark:text-black text-white px-3.5 py-2.5 font-semibold leading-7"
                                                    >
                                                        <Spinner size={"sm"} />
                                                    </div>
                                                ) : (
                                                    <button
                                                        class="inline-flex w-full items-center justify-center rounded-md dark:bg-white bg-black dark:text-black text-white px-3.5 py-2.5 font-semibold leading-7"
                                                        type='Onsubmit'
                                                    // onClick={addplaylist}
                                                    >
                                                        Create
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    );
}

export default Playlist;



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