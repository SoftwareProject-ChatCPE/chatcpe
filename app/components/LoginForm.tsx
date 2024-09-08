"use client";
import Head from 'next/head';
import Link from 'next/link';
import useLogin from '/hooks/useLogin';

export default function LoginForm() {
    const {
        username,
        password,
        rememberMe,
        handleUsernameChange,
        handlePasswordChange,
        handleRememberMeChange,
        handleSubmit,
    } = useLogin();

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
                            onChange={handleUsernameChange}
                            className="p-2 mb-2 border border-gray-300 rounded w-4/5"
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            className="p-2 mb-2 border border-gray-300 rounded w-4/5"
                        />
                        <label className="flex items-center mb-5">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="bg-[#8471f5] border-none text-white py-2 px-4 text-center inline-block text-lg mb-1 cursor-pointer rounded-full w-4/5">
                        Login
                    </button>
                    <Link href="/" className="bg-[#bba0f5] border-none text-white py-2 px-4 text-center inline-block text-lg cursor-pointer rounded-full w-4/5">
                        Back to Home
                    </Link>
                </form>
            </main>
        </>
    );
}