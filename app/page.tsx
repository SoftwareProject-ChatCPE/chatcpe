"use client";
// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";
import Image from 'next/image';
import { Carousel } from "flowbite-react";


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
      <main className="main-container">
        <h1 className="heading">Welcome to ChatCPE</h1>
        <p className="subheading ">a basic screening bot</p>
        <div className="flex space-x-4">
          <button className="button">
            Enter
          </button>
          <div className="relative">
            <button className="button">
            <Link href="/login">Login</Link>
            </button>
            <p className="warn absolute -bottom-6 left-8">
              ** for staff only
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="carouselContainer">
          <div className="carousel-container mt-8">
            <div className="carousel-message"></div>
            <div className="carousel-slide text-center text-2xl "> {messages[currentIndex]}</div>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handlePrevClick} className="carousel-button">&lt; Prev</button>
              <button onClick={handleNextClick} className="carousel-button">Next &gt;</button>
            </div>
          </div>
        </div>

        {/* background */}
        <div className="area" >
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
        </div >



        {/* <div className="absolute bottom-4 left-4">
          <button className="footer-button">
            EN
          </button>
        </div> */}
      </main >
    </>
  );
}