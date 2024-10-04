import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import CircleFollowMouse from '../../components/CircleFollowMouse';
import Navbar from "../../components/navbar";

const Facultymappage = () => {
    return (
        <>
            <Navbar />
            <CircleFollowMouse />
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h2 className="text-2xl text-[#82659D] mb-5">What Building That You  Are Looking For?</h2>
                        <div className="flex flex-wrap justify-center">
                            <Image
                                src="/aboutmap/facmap.png" // Use the path directly
                                alt="Scholarship Image"
                                layout="responsive" // Makes the image responsive
                                className="rounded-lg" // Optional styling
                                width={600} // Width of the image
                                height={400} // Height of the image (adjusted for better aspect ratio)
                            // You can adjust the height to whatever is appropriate for your image
                            />

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

export default Facultymappage
