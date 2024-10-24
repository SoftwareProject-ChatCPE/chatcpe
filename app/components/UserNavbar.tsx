'use client';
import {Flowbite, Navbar} from 'flowbite-react';

const UserNavbar = () => {
    const customTheme = {
        navbar: {
            link: {
                base: "block py-2 pl-3 pr-4 md:p-0",
                active: {
                    on: " font-bold text-white dark:text-white md:bg-transparent hover:text-fuchsia-200 md:dark:hover-text-white",
                    off: " font-bold border-b border-gray-100 text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-fuchsia-100 md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white"
                },
            },
        },
    };
    return (
        <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid className="bg-[#8366CD] shadow-md fixed top-0 left-0 w-full z-[1000]">
            <Navbar.Brand href="/">
                <div className="text-left">
                    <h1 className="text-2xl text-white m-0">ChatCPE</h1>
                    <p className="text-lg text-white m-0">a basic screening bot</p>
                </div>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-between">
                <Navbar.Link href="/" className='text-indigo-200'>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/user">
                    Question
                </Navbar.Link>
                <Navbar.Link href="/user/floormap">
                    Floor Map
                </Navbar.Link>
                <Navbar.Link href="/user/map">
                    University Map
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        </Flowbite>
    );
};

export default UserNavbar;