"use client";
// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    'Q1: Scholarship',
    'Q2: Document.',
    'Q3: Professor\'s contact.',
    'Q4: Classroom',
    'Q5: 30th Building Map'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [messages.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + messages.length) % messages.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };

  return (
    <>
      <Head>
        <title>ChatCPE</title>
        <meta name="description" content="A basic screening bot" />
        <link rel="stylesheet" href="global.css"></link>
        <link href="'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'" rel="stylesheet"></link>
      </Head>

      <main className="bg-[#F1EAFF] p-6 flex flex-col items-center mt-[3%] z-40">
        <h1 className="text-[#8366CD] text-6xl mb-4 font-montserrat font-extrabold">
          Welcome to ChatCPE
        </h1>
        <p className="text-[#ad94f7] text-2xl mb-8 font-montserrat font-semibold">
          a basic screening bot
        </p>

        <div className="flex space-x-4 z-50">
          <button className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded-full hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 w-40 font-montserrat font-extrabold">
            <Link href="/select">Enter</Link>
          </button>

          <div className="relative z-59">
            <button className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded-full hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 w-40 font-montserrat font-extrabold">
              <Link href='/sign-in'>Sign-in</Link>
            </button>
            <p className="text-sm text-red-500 mt-2 absolute -bottom-6 left-8">
              ** for staff only
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative mt-8 z-100">
          <div className="w-full h-10 overflow-hidden relative">
            <div className="text-center text-2xl text-[#8366CD] animate-slideLeft">
              {messages[currentIndex]}
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4 z-110">
            <button onClick={handlePrevClick} className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300">
              &lt; Prev
            </button>
            <button onClick={handleNextClick} className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300">
              Next &gt;
            </button>
          </div>
        </div>

        {/* Background circles */}
        <div className="absolute inset-0 z-0">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </main>
    </>
  );
}
