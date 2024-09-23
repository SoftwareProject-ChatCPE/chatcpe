"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const messages = [
    'Q1: Scholarship',
    'Q2: Document',
    'Q3: Professor\'s contact',
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

      </Head>

      <main className="bg-[#F1EAFF] p-6 flex flex-col items-center mt-[3%] z-40 relative min-h-screen">
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

          <div className="relative z-50">
            <button className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded-full hover:bg-[#E5D9F2] hover:text-[#82659D] transform hover:scale-110 transition-all duration-300 w-40 font-montserrat font-extrabold">
              <Link href='/sign-in'>Sign-in</Link>
            </button>
            <p className="text-sm text-red-500 mt-2 absolute -bottom-6 left-8">
              ** for staff only
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-full max-w-xl mt-8 z-10">
          <div className="relative h-10 overflow-hidden text-center text-2xl text-purple-700 font-semibold">
            <div key={currentIndex} className="absolute w-full animate-slide">{messages[currentIndex]}</div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
                onClick={handlePrevClick}
                className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded-lg font-semibold font-[Montserrat] hover:bg-[#E5D9F2] hover:text-[#82659D] active:bg-purple-900 active:scale-90 transform transition-transform duration-300">
              &lt; Prev
            </button>
            <button
                onClick={handleNextClick}
                className="bg-[#9e7fec] text-[#E6FFFD] px-4 py-2 rounded-lg font-semibold font-[Montserrat] hover:bg-[#E5D9F2] hover:text-[#82659D] active:bg-purple-900 active:scale-90 transform transition-transform duration-300">
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

      <style jsx>{`
        @keyframes slideLeft {
          0% { transform: translateX(100%); opacity: 0; }
          10%, 90% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        .animate-slide {
          animation: slideLeft 5s ease-in-out; /* Duration and easing */
        }
      `}</style>
    </>
  );
}