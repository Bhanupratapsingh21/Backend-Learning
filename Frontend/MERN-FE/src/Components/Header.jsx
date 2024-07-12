import React, { useState, useEffect } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const theme = extendTheme({
        components: {
          Drawer: {
            baseStyle: {
              dialog: {
                bg: isDarkMode ? "black" : "white",
                color: isDarkMode ? "white" : "black",
              },
            },
          },
        },
      });
    
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <header className="fixed w-full h-20 sm:ml-80 bg-white dark:bg-black dark:text-white shadow-lg z-10">
                <div className="bg-white sm:w-[50vw] w-[100vw]  h-20 flex items-center justify-between px-2 sm:px-8 dark:bg-black dark:text-white text-black">
                    <label className='sm:hidden block -mr-4'>
                        <div
                            class="w-9 h-20 cursor-pointer flex flex-col items-center justify-center"
                            onClick={onOpen}
                        >
                            <input class="hidden peer" type="checkbox" />
                            <div
                                class="w-[70%] h-[4px] dark:bg-white bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.9rem] "
                            ></div>
                            <div
                                class="w-[70%] h-[4px] dark:bg-white bg-black rounded-md transition-all duration-300 origin-center"
                            ></div>
                            <div
                                class="w-[70%] h-[4px] dark:bg-white bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.9rem] "
                            ></div>
                        </div>
                    </label>
                    <div class="flex -mr-4 sm:mr-0 items-center justify-center p-5">
                        <div>
                            <div class="flex border dark:border-slate-800 rounded-lg dark:bg-slate-700 bg-white border-gray-400">
                                <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r dark:border-slate-800 dark:bg-slate-700 border-gray-200 p-5">
                                    <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
                                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                                    </svg>
                                </div>
                                <input placeholder="Search" type="text" class="w-[50vw] focus:border-transparent focus:outline-none dark:bg-slate-700 border-transparent mr-1 pl-2 dark:text-white text-black font-semibold outline-0" id="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <article
                        class="sm:flex hidden justify-center  left-0 "
                    >

                        <label
                            for="profile"
                            class="relative w-full h-16 p-4  group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                        >
                            <input class="hidden peer/expand" type="radio" name="path" id="profile" />
                            <svg
                                class="peer-hover/expand:scale-125 dark:fill-white peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                                ></path>
                            </svg>
                        </label>
                        <label
                            for="settings"
                            class="relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
                        >
                            <input
                                class="hidden peer/expand"
                                type="radio"
                                name="path"
                                id="settings"
                            />
                            <svg
                                class="peer-hover/expand:scale-125 dark:fill-white peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 "
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"
                                ></path>
                                <path
                                    d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"
                                ></path>
                            </svg>
                        </label>
                    </article>
                </div>
            </header>
            <div>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    theme={theme}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create your account</DrawerHeader>

                        <DrawerBody>
                           
                        </DrawerBody>

                        <DrawerFooter>
                           
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

export default Header;
