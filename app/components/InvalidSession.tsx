'use client';
import React from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

const SessionInvalid: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <p className="text-2xl text-red-600 mb-4">The session is not valid, please login.</p>
            <div className="flex">
            <Link href="/sign-in">
                <Button color="success" className="m-2">
                    Login
                </Button>
            </Link>
            <Link href="/">
                <Button color="gray" className=" m-2">
                    Home
                </Button>
            </Link>
            </div>
        </div>
    );
};

export default SessionInvalid;