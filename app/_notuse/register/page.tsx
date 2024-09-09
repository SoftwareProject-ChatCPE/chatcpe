"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your login logic here
        console.log('Logging in with:', { username, password, rememberMe });
    };

    return (
        <>

            <main className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-[#8471f5] mb-5 text-xl">Staff Login</h1>
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-2 mb-2 border border-gray-300 rounded w-4/5"
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-2 mb-2 border border-gray-300 rounded w-4/5"
                        />
                        <label className="flex items-center mb-5">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="bg-[#8471f5] border-none text-white py-2 px-4 text-center inline-block text-lg mb-1 cursor-pointer rounded-full w-4/5">
                        Login
                    </button>
                    <Link href="/public" className="bg-[#bba0f5] border-none text-white py-2 px-4 text-center inline-block text-lg cursor-pointer rounded-full w-4/5">
                        Back to Home
                    </Link>
                </form>
            </main>
        </>
    );
}