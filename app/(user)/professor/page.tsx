"use client";
import React from "react";
import Link from "next/link";
import CircleFollowMouse from "../../components/CircleFollowMouse";
import Navbar from "../../components/navbar";

const professors = [
    {
        name: "Santi Phithakkitnukoon, Ph.D.",
        title: "Associate Professor",
        room: "510",
        email: "santi@eng.cmu.ac.th",
        available: true,
    },
    {
        name: "Jane Doe, Ph.D.",
        title: "Assistant Professor",
        room: "511",
        email: "jane@eng.cmu.ac.th",
        available: true,
    },
    {
        name: "John Smith, Ph.D.",
        title: "Senior Lecturer",
        room: "512",
        email: "john@eng.cmu.ac.th",
        available: false,
    },
    {
        name: "Emily White, Ph.D.",
        title: "Research Fellow",
        room: "513",
        email: "emily@eng.cmu.ac.th",
        available: true,
    },
];

const Professor = () => {
    return (
        <>
            <Navbar />
            <CircleFollowMouse />

            <div className="flex flex-wrap justify-evenly mt-24 w-11/12 mx-auto max-w-4xl">
                {professors.map((professor, index) => (
                    <div
                        className="bg-[#c6b3f6] rounded-lg overflow-hidden shadow-md w-96 flex mt-5" // Removed h-52 class
                        key={index}
                    >
                        <img
                            className="p-2 w-24 h-24 rounded-full object-cover"
                            src="https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg"
                            alt="Professor"
                        />
                        <div className="p-5 text-left">
                            <p className="text-sm">
                                {professor.name} <br />
                                {professor.title} <br />
                                Email: {professor.email}
                            </p>
                            <ul className="flex space-x-4 mt-2 items-center">
                                {professor.available ? (
                                    <>
                                        <li className="flex items-center text-sm text-green-500">
                                            <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                            Available
                                        </li>
                                        <li className="text-sm">
                                            Now At Room: {professor.room} {/* Show room if available */}
                                        </li>
                                    </>
                                ) : (
                                    <li className="flex items-center text-sm text-red-500">
                                        <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                                        Not Available
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/select">
                <div className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 flex justify-between items-center fixed bottom-10 right-10">
                    Return
                </div>
            </Link>
        </>
    );
};

export default Professor;
