'use client';
import {Navbar, Dropdown, Flowbite} from 'flowbite-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const AdminNavbar = () => {
    const customTheme = {
        navbar: {
            link: {
                base: "block py-2 pl-3 pr-4 md:p-0",
                active: {
                    on: "font-bold text-white dark:text-white md:bg-transparent hover:text-fuchsia-200 md:dark:hover-text-white",
                    off: "font-bold border-b border-gray-100 text-white hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 hover:text-fuchsia-100 md:border-0 md:hover:bg-transparent md:dark:hover:bg-transparent md:dark:hover:text-white"
                },
            },
        },
    };

    return (
        <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid className="bg-[#8366CD] shadow-md fixed top-0 left-0 w-full z-[1000] " >
            <Navbar.Brand href="/">
                <div className="text-left">
                    <h1 className="text-2xl text-white m-0">ChatCPE</h1>
                    <p className="text-lg text-white m-0">a basic screening bot</p>
                </div>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-start">
                <Navbar.Link href="/admin">
                    Statistic
                </Navbar.Link>
                <Navbar.Link href="/admin/category">
                    Category
                </Navbar.Link>

                <div className="flex md:order-1">

                    <Dropdown
                        label={<span className="text-white font-bold">Action</span>}
                        inline={true}
                    >
                        <Dropdown.Item>
                            <Link href="/" className="text-[#8366CD] hover:text-fuchsia-200">
                                Home
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href="/sign-up" className="text-[#8366CD] hover:text-fuchsia-200">
                                Add Admin
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => signOut()} className="text-[#8366CD] hover:text-fuchsia-200">
                            Logout
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle/>
                </div>

            </Navbar.Collapse>
        </Navbar>
        </Flowbite>
    );
};

export default AdminNavbar;