'use client';
import { useState } from "react";
import Link from 'next/link';
import { FiMenu, FiX, FiInfo } from "react-icons/fi"; // Importing icons for hamburger menu and info

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [infoOpen, setInfoOpen] = useState(false); // State to manage info tooltip visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the mobile menu
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#8366CD] p-5 shadow-md flex justify-between items-center z-[1000]">
      <div className="text-left">
        <h1 className="text-2xl text-[#E6FFFD] m-0">ChatCPE</h1>
        <p className="text-lg text-[#E6FFFD] m-0">a basic screening bot</p>
      </div>

      <button onClick={toggleMenu} className="md:hidden text-[#E6FFFD]">
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />} {/* Hamburger icon */}
      </button>

      <nav className={`absolute md:static top-16 left-0 w-full md:w-auto bg-[#8366CD] md:bg-transparent transition-all duration-300 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0 relative">
          <li><Link href="/" className="text-[#E6FFFD] font-bold">Home</Link></li>
          <li><Link href="/select" className="text-[#E6FFFD] font-bold">Menu</Link></li>
          <li><Link href="/map" className="text-[#E6FFFD] font-bold">Map</Link></li>
          {/* Dropdown for Questions */}
          <li 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)} // Show dropdown on hover
            onMouseLeave={() => setDropdownOpen(false)} // Hide dropdown on mouse leave
          >
            <span className="text-[#E6FFFD] font-bold cursor-pointer">Questions</span>
            <FiInfo 
              className="inline-block text-[#E6FFFD] ml-1 cursor-pointer" 
              onMouseEnter={() => setInfoOpen(true)} // Show tooltip on hover
              onMouseLeave={() => setInfoOpen(false)} // Hide tooltip on mouse leave
              size={16}
            />
            {infoOpen && (
              <div className="absolute left-0 bg-white text-gray-700 p-2 rounded shadow-lg mt-1 z-20">
                Hover over "Questions" to find more information about available resources.
              </div>
            )}
            {dropdownOpen && (
              <ul className="absolute left-0 bg-[#8366CD] mt-2 rounded-lg shadow-lg p-2 space-y-2">
                <li><Link href="/classroom" className="text-[#E6FFFD] font-bold">Classroom</Link></li>
                <li><Link href="/professor" className="text-[#E6FFFD] font-bold">Professor</Link></li>
                <li><Link href="/scholarship" className="text-[#E6FFFD] font-bold">Scholarship</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
