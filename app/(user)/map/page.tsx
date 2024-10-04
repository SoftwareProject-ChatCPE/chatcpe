import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import CircleFollowMouse from '../../components/CircleFollowMouse';
import Navbar from "../../components/navbar";

const Mappage = () => {
    return (
        <>
            <Navbar />
            <CircleFollowMouse />
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h2 className="text-2xl text-[#82659D] mb-5">What Building That You  Are Looking For?</h2>
                        <div className="flex flex-wrap justify-center">
                            {/* Google Map Embed */}
                            <div className="w-full h-[500px] lg:w-3/4">
                                <iframe
                                    src="https://www.google.com/maps/d/embed?mid=1nctqKMg8dxs_zASG1yo_RfCxuNcy06w&hl=en&ll=18.79523952538685%2C98.9519929899704&z=18"
                                    width="100%"
                                    height="100%"

                                    loading="lazy"
                                    className="border rounded-lg shadow-lg"
                                ></iframe>
                            </div>
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

export default Mappage
