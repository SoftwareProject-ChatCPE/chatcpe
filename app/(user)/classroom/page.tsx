"use client";  // เพิ่มบรรทัดนี้เพื่อระบุว่าเป็น Client Component

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import CircleFollowMouse from '../../components/CircleFollowMouse';
import Navbar from "../../components/navbar";  // Keep the old Navbar



const Classroompage = () => {
    const [activeFloor, setActiveFloor] = useState(1);  // Default active floor is 1

    // Content for each floor
    const floorContent = {
        1: {
            text: "Welcome to the 1st floor! Here you can find ME Space.",
            imageSrc: "/chihiro010.jpg" // Example image path
        },
        M: {
            text: "Welcome to the M floor! This is the administrative office area.",
            imageSrc: "/chihiro005.jpg"
        },
        2: {
            text: "Welcome to the 2nd floor! More classrooms and student areas here.",
            imageSrc: "/chihiro002.jpg"
        },
        3: {
            text: "Welcome to the 3rd floor! It houses faculty offices and seminar rooms.",
            imageSrc: "/chihiro001.jpg"
        },
        4: {
            text: "Welcome to the 4th floor! It houses faculty offices and lab area.",
            imageSrc: "/t.jpg"
        },
        5: {
            text: "Welcome to the 5th floor! It’s where you’ll find the study rooms.",
            imageSrc: "/o.jpg"
        },
        6: {
            text: "Welcome to the 6th floor! This is the lab area.",
            imageSrc: "/g.jpg"
        },
        7: {
            text: "Welcome to the 7th floor! Here you will find more meeting room and more class room.",
            imageSrc: "/a.jpg"
        },
        8: {
            text: "Welcome to the 8th floor! More classrooms and student areas here.",
            imageSrc: "/chihiro010.jpg"
        }
    };

    const handleFloorClick = (floor) => {
        setActiveFloor(floor);
    };

    return (
        <>
            {/* Old Horizontal Navbar */}
            <Navbar />



            {/* New Vertical Box-Style Navbar */}
            <nav className="fixed top-20 left-5 h-full w-16 md:w-20 lg:w-24 flex flex-col items-center justify-between py-8 text-[#E6FFFD] font-bold overflow-auto">
                <div className="flex flex-col space-y-2">
                    {/* Each button changes color if it's the active floor */}
                    <button
                        onClick={() => handleFloorClick(1)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 1 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        1st Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick('M')}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 'M' ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        M Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(2)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 2 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        2nd Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(3)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 3 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        3rd Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(4)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 4 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        4th Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(5)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 5 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        5th Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(6)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 6 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        6th Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(7)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 7 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        7th Floor
                    </button>
                    <button
                        onClick={() => handleFloorClick(8)}
                        className={`p-2 text-sm rounded-lg transition ${activeFloor === 8 ? 'bg-[#d9caf9] text-[#82659D]' : 'bg-[#9e7fec] hover:bg-[#F1EAFF] hover:text-[#82659D]'}`}
                    >
                        8th Floor
                    </button>
                </div>
            </nav>



            <CircleFollowMouse />

            {/* Main Content */}
            <main className="mt-24 p-5 ml-24"> {/* เพิ่ม margin-top ที่นี่ */}
                <section>
                    <h2 className="text-2xl text-[#82659D]">Floor {activeFloor}</h2>
                    <p>{floorContent[activeFloor].text}</p> {/* แสดงเนื้อหาของชั้นที่เลือก */}

                    {/* Wrap the image in a div with class image-wrapper */}
                    <div className="image-wrapper mt-10 flex justify-center">  {/* เพิ่ม .image-wrapper ที่นี่ */}
                        <Image
                            src={floorContent[activeFloor].imageSrc}
                            alt={`Image of ${activeFloor} floor`}
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg object-cover w-full max-w-[600px] h-auto"
                        />
                    </div>
                </section>
            </main>

            {/* Return Button */}
            <Link href="/select">
                <div className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 flex justify-between items-center fixed bottom-10 right-10">
                    Return
                </div>
            </Link>
        </>
    );
}

export default Classroompage;