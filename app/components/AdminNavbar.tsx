'use client';
import { Navbar , Dropdown } from 'flowbite-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const AdminNavbar = () => {
    return (
        <Navbar fluid className="bg-[#8366CD] shadow-md fixed top-0 left-0 w-full z-[1000]">
            <Navbar.Brand href="/">
                <div className="text-left">
                    <h1 className="text-2xl text-white m-0">ChatCPE</h1>
                    <p className="text-lg text-white m-0">a basic screening bot</p>
                </div>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-start">
                <Navbar.Link href="/admin" className="text-white font-bold hover:text-fuchsia-200">
                    Statistic
                </Navbar.Link>
                <Navbar.Link href="/admin/category" className="text-white font-bold hover:text-fuchsia-200">
                    Category
                </Navbar.Link>
                {/*<Navbar.Link href="/admin/question" className="text-white font-bold hover:text-fuchsia-200">*/}
                {/*    Question*/}
                {/*</Navbar.Link>*/}

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

    );
};

export default AdminNavbar;