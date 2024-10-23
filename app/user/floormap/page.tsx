"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';

import UserNavbar from "../../components/UserNavbar";  // Keep the old UserNavbar

const Classroompage = () => {
    const [activeFloor, setActiveFloor] = useState(null);  // Default active floor is null since no floor is selected by default
    const [searchFloor, setSearchFloor] = useState(''); // Add state for search input

    // Content for each floor
    const floorContent = {
        M: {
            text: "Welcome to the M floor! This is the administrative office area. Rooms M01 to M30 are here.",
            imageSrc: "/floor/floorM.jpg"
        },
        2: {
            text: "Welcome to the 2nd floor! More classrooms and student areas here.",
            imageSrc: "/floor/floor2.jpg"
        },
        3: {
            text: "Welcome to the 3rd floor! It houses faculty offices and seminar rooms.",
            imageSrc: "/floor/floor3.jpg"
        },
        4: {
            text: "Welcome to the 4th floor! It houses faculty offices and lab area.",
            imageSrc: "/floor/floor4.jpg"
        },
        5: {
            text: "Welcome to the 5th floor! It’s where you’ll find the study rooms.",
            imageSrc: "/floor/floor5.jpg"
        },
        6: {
            text: "Welcome to the 6th floor! This is the lab area.",
            imageSrc: "/floor/floor6.jpg"
        },
        7: {
            text: "Welcome to the 7th floor! Here you will find more meeting rooms and classrooms.",
            imageSrc: "/floor/floor7.jpg"
        },
        8: {
            text: "Welcome to the 8th floor! More classrooms and student areas here.",
            imageSrc: "/floor/floor8.jpg"
        }
    };

    // Handle floor click
    const handleFloorClick = (floor: keyof typeof floorContent) => {
        setActiveFloor(floor);
    };

    // Function to handle the search
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchTerm = searchFloor.toUpperCase();

        // Handle patterns for 'M01 to M30'
        if (searchTerm.startsWith('M')) {
            const roomNumber = parseInt(searchTerm.slice(1)); // Extract the number after 'M'
            if (roomNumber >= 1 && roomNumber <= 30) {
                setActiveFloor('M');
            } else {
                alert("Invalid room number on M floor! Please search for rooms between M01 and M30.");
            }
        }
        // Handle patterns for '2xx'
        else if (searchTerm.startsWith('2')) {
            const validRooms = ['201', '202', '203', '204', '205', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', '222', '223', '225', '226']
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(2);
            } else {
                alert("Invalid room number on the 2nd floor! Please search for rooms between 201 and 226, excluding 206 and 224.");
            }
        }
        // Handle patterns for '3xx'
        else if (searchTerm.startsWith('3')) {
            const validRooms = ['301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327']
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(3);
            } else {
                alert("Invalid room number on the 3rd floor! Please search for rooms between 301 and 327.");
            }
        }
        // Handle patterns for '4xx'
        else if (searchTerm.startsWith('4')) {
            const validRooms = ['401', '402', '402.5', '409', '410', '411A', '411B', '412', '412s', '413A', '414A', '414B', '415A', '415B', '422', '444', '448', 'ADMIN'];
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(4);
            } else {
                alert("Invalid room number on the 4th floor! Please search for valid rooms: 401-405, 402.5, 409, 410, 411A, 411B, 412, 412s, 413A, 414A, 414B, 415A, 415B, 422, 444, 448, ADMIN.");
            }
        }
        // Handle patterns for '5xx'
        else if (searchTerm.startsWith('5')) {
            const validRooms = ['Networkroom', '529', '595', '501', '559', '503', '504', '505', '508', '509', '510', '532', '514', '515', '516', '518', '519', '520', '521', '558'];
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(5);
            } else {
                alert("Invalid room number on the 5th floor! Please search for valid rooms: Networkroom, 501-595 (excluding some ranges).");
            }
        }
        // Handle patterns for '6xx'
        else if (searchTerm.startsWith('6')) {
            const validRooms = ['601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '632', '633']
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(6);
            } else {
                alert("Invalid room number on the 6th floor! Please search for rooms between 601 and 630, or 632-633.");
            }
        }
        // Handle patterns for '7xx'
        else if (searchTerm.startsWith('7')) {
            const validRooms = ['701', '702', '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '713', '714', '715', '716', '717', '718', '719', '720', '721', '722', '723', '724', '725', '726', '727', '728', '729', '730', '731', '732', '733', '734', '735']
            if (validRooms.includes(searchTerm)) {
                setActiveFloor(7);
            } else {
                alert("Invalid room number on the 7th floor! Please search for rooms between 701 and 735.");
            }
        }
        // Handle patterns for '8xx'
        else if (searchTerm.startsWith('8')) {
            const validRooms = [
                '801', '802', '803', '804', '805', '806', '807',
                '811', '812', '813', '814', '815', '816', '817', '818',
                '818(1)', '818(2)', '826', '827', '828'
            ];

            if (validRooms.includes(searchTerm)) {
                setActiveFloor(8);
            } else {
                alert("Invalid room number on the 8th floor! Please search for valid rooms: 801-807, 811-821, 818(1)-818(2), 826-828.");
            }
        } else {
            alert("Floor not found! Please search for floors like 2xx, 3xx, M01-M30...");
        }
    };


    return (
        <>
            {/* Old Horizontal UserNavbar */}
            <UserNavbar />

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="fixed top-[120px] right-5 w-full max-w-[300px] flex items-center">
                <input
                    type="text"
                    value={searchFloor}
                    onChange={(e) => setSearchFloor(e.target.value)}
                    placeholder="Search floor (M01-M30, 2xx, 3xx...)"
                    className="p-2 rounded-lg bg-[#F1EAFF] text-[#82659D] border border-[#9e7fec] w-full"
                />
                <button type="submit" className="ml-2 px-4 py-2 bg-[#9e7fec] text-[#E6FFFD] rounded hover:bg-[#E5D9F2] hover:text-[#82659D]">
                    Go
                </button>
            </form>

            {/* New Vertical Box-Style UserNavbar */}
            <nav className="fixed top-20 left-5 h-full w-16 md:w-20 lg:w-24 flex flex-col items-center justify-between py-8 text-[#E6FFFD] font-bold overflow-auto">
                <div className="flex flex-col space-y-2">
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


            {/* Main Content */}
            <main className="mt-24 p-5 ml-24">
                <section>
                    {activeFloor ? (
                        <>
                            <h2 className="text-2xl text-[#82659D]">Floor {activeFloor}</h2>
                            <p>{floorContent[activeFloor]?.text}</p> {/* Show content for the selected floor */}

                            {/* Wrap the image in a div with class image-wrapper */}
                            <div className="image-wrapper mt-10 flex justify-center">
                                <Image
                                    src={floorContent[activeFloor]?.imageSrc}
                                    alt={`Image of ${activeFloor} floor`}
                                    width={500}
                                    height={300}
                                    className="rounded-lg shadow-lg object-cover w-full max-w-[600px] h-auto"
                                />
                            </div>
                        </>
                    ) : (
                        <p className="text-[#82659D]">Please select or search for a floor.</p>
                    )}
                </section>
            </main>

        </>
    );
}

export default Classroompage;
