'use client';
import { Navbar } from 'flowbite-react';

const UserNavbar = () => {
    return (
        <Navbar fluid className="bg-[#8366CD] shadow-md fixed top-0 left-0 w-full z-[1000]">
            <Navbar.Brand href="/">
                <div className="text-left">
                    <h1 className="text-2xl text-white m-0">ChatCPE</h1>
                    <p className="text-lg text-white m-0">a basic screening bot</p>
                </div>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-between">
                <Navbar.Link href="/user" className="text-white font-bold hover:text-fuchsia-200">
                    Question
                </Navbar.Link>
                <Navbar.Link href="/user/floormap" className="text-white font-bold hover:text-fuchsia-200">
                    Floor Map
                </Navbar.Link>
                <Navbar.Link href="/user/map" className="text-white font-bold hover:text-fuchsia-200">
                    University Map
                </Navbar.Link>
                <p className="text-white font-bold">|</p>
                <Navbar.Link href="/" className="text-white font-bold hover:text-fuchsia-200">
                    Home
                </Navbar.Link>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default UserNavbar;