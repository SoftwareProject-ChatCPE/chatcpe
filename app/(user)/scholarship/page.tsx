import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import CircleFollowMouse from '../../components/CircleFollowMouse';
import Navbar from "../../components/navbar";

const Scholarshippage = () => {
    return (
        <>
            <Navbar />
            <CircleFollowMouse />
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h2 className="text-2xl text-[#82659D] mb-5">What Scholarship Are You Seeking For?</h2>
                        <div className="flex flex-wrap justify-center">
                            <Link href="#" className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                            Academic Contest Scholarship
                            </Link>
                            <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                            Academic Activity Scholarship, Extra-Curricular Activities and Sports Activities
                            </button>
                            <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                            Academic Contest Scholarship
                            </button>
                            <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                            Financial aid for underprivileged students
                            </button>
                            <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                            Academic excellence scholarship
                            </button>
                        </div>
                    </section>
                </main>
            </div>

            <Link href="/select">
                <div className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300flex justify-between items-center fixed bottom-10 right-10">Return</div>
            </Link>

        </>
    )
}

export default Scholarshippage
