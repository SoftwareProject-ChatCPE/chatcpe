import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import UserNavbar from "../../components/UserNavbar";

const scholarshipOptions = [
    {
        label: "Financial Hardship",
        description: "This scholarship is allocated for students who are financially disadvantaged, aiming to assist with education expenses, learning materials, and living costs.",
    },
    { label: "Academic Excellence" },
    { label: "Wisdom of Engineering" },
    { label: "Work-Based" },
    { label: "Emergency" },
    { label: "Academic, Extracurricular, and Sports Activities" },
    { label: "Academic Competition Achievements" },
    { label: "Outstanding Academic Achievement" },
];

const ScholarshipButton = ({ label, description }) => (
    <div className="relative group">
        <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
            {label}
        </button>
        {description && (
            <div className="absolute hidden group-hover:block bg-white text-gray-700 p-4 border rounded-lg shadow-lg w-72 z-10">
                <p>{description}</p>
            </div>
        )}
    </div>
);

const ContactInfo = () => (
    <div className="content bg-white shadow-lg p-4 m-5 rounded-lg">
        <div className="info-container">
            <p>ห้องพัฒนาคุณภาพนักศึกษา ชั้น 2 อาคารเรียนรวม 3 ชั้น</p>
            <p>คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
            <p>โทรศัพท์ : 053-944-179</p>
            <p>Email : studentaffairs@cmu.ac.th</p>
            <div className="buttons flex flex-row items-center justify-center space-x-4 mt-4">
                <a href="https://www.facebook.com/ScholarshipsENG/?locale=th_TH" target="_blank" rel="noopener noreferrer">
                    <button className="social-btn bg-gray-400 text-white w-10 h-10 rounded-full flex items-center justify-center">
                        f
                    </button>
                </a>
                <Link href="/facultymap">
                    <button className="map-btn text-gray-400 underline">แผนผังคณะ</button>
                </Link>
                <Link href="/map">
                    <button className="map-btn text-gray-400 underline">Google Map</button>
                </Link>
            </div>
        </div>
    </div>
);

const Scholarshippage = () => {
    return (
        <>
            <UserNavbar />
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h2 className="text-2xl text-[#82659D] mb-5">What Scholarship Are You Seeking For?</h2>
                        <div className="relative">
                            {/* Right section */}
                            <div className="w-full lg:w-2/3 p-4 lg:absolute lg:top-0 lg:right-0">
                                <div className="flex flex-wrap justify-center">
                                    {/* Info of scholarship */}
                                    {scholarshipOptions.map((option, index) => (
                                        <ScholarshipButton key={index} label={option.label} description={option.description} />
                                    ))}

                                    {/* Contact info container */}
                                    <ContactInfo />
                                </div>
                            </div>

                            {/* Left section with image */}
                            <div className="w-full lg:w-1/3 p-4 lg:absolute lg:top-0 lg:left-0">
                                <Image
                                    src="/IMG_2324.jpg" // Use the path directly
                                    alt="Scholarship Image"
                                    layout="responsive" // Makes the image responsive
                                    className="rounded-lg" // Optional styling
                                    width={600} // Add width
                                    height={1000} // Add height
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <Link href="/select">
                <div className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 flex justify-between items-center fixed bottom-10 right-10">Return</div>
            </Link>
        </>
    );
};

export default Scholarshippage;
