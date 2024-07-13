import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
  return (
    <aside className="fixed hidden sm:block left-0 top-0 h-screen w-80 bg-white dark:bg-black rounded-r-3xl dark:text-white  z-10">
      <div className="min-h-screen flex bg-gray-100 dark:bg-black">
                <div className="hidden min-w-40 sm:flex flex-col w-80 bg-white dark:bg-black overflow-hidden">
                    <Link to={"/"} className="flex items-center justify-center w-40 h-20">
                        <h1 className="text-4xl uppercase text-indigo-500">&lt;/&gt;</h1>
                    </Link>
                    <ul className="flex flex-col py-4">
                        <li>
                            <Link to={"/"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg dark:text-white"><i className="bx bx-home"></i></span>
                                <span className="text-sm font-medium">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/videos"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                                <span className="text-sm font-medium">Video's</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/tweets"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
                                <span className="text-sm font-medium">Tweet's</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/subscription"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
                                <span className="text-sm font-medium">Subscription's</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/playlist"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
                                <span className="text-sm font-medium">Playlist's</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/watch-history"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
                                <span className="text-sm font-medium">Watch-History</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/profile"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-user"></i></span>
                                <span className="text-sm font-medium">User-Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
                                <span className="text-sm font-medium">Notifications</span>

                            </Link  >
                        </li>
                        <li>
                            <Link to={"/"} href="#" className="flex flex-row hover:border hover:border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                                <span className="text-sm font-medium">Logout</span>
                            </Link  >
                        </li>
                    </ul>
                </div>
                <div className='justify-center'>
        
                
                </div>
            </div>
    </aside>
  );
}

export default Sidebar;

// <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">5</span>