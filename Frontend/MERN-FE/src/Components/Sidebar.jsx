import React from 'react';

function Sidebar() {
  return (
    <aside className="fixed hidden sm:block left-0 top-0 h-screen w-80 bg-white dark:bg-black rounded-r-3xl dark:text-white  z-10">
      <div className="min-h-screen flex bg-gray-100 dark:bg-black">
                <div className="hidden min-w-40 sm:flex flex-col w-80 bg-white dark:bg-black overflow-hidden">
                    <div className="flex items-center justify-center w-40 h-20">
                        <h1 className="text-4xl uppercase text-indigo-500">&lt;/&gt;</h1>
                    </div>
                    <ul className="flex flex-col py-4">
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg dark:text-white"><i className="bx bx-home"></i></span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-music"></i></span>
                                <span className="text-sm font-medium">Music</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-drink"></i></span>
                                <span className="text-sm font-medium">Drink</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-shopping-bag"></i></span>
                                <span className="text-sm font-medium">Shopping</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-chat"></i></span>
                                <span className="text-sm font-medium">Chat</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-user"></i></span>
                                <span className="text-sm font-medium">Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-bell"></i></span>
                                <span className="text-sm font-medium">Notifications</span>

                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex flex-row hover:border hover:border-gray-600 rounded-3xl items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 dark:text-white text-gray-900 hover:text-gray-500">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className="bx bx-log-out"></i></span>
                                <span className="text-sm font-medium">Logout</span>
                            </a>
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