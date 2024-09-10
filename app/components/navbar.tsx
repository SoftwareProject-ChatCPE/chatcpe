'use client'
import { useRouter } from "next/navigation";
import Link from 'next/link';


const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#8366CD] p-5 shadow-md flex justify-between items-center z-[1000]">
      <div className="text-left">
        <h1 className="text-2xl text-[#E6FFFD] m-0">ChatCPE</h1>
        <p className="text-lg text-[#E6FFFD] m-0">a basic screening bot</p>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-[#E6FFFD] font-bold">Home</a></li>
          <li><a href="#" className="text-[#E6FFFD] font-bold">Find</a></li>
          <li><a href="#" className="text-[#E6FFFD] font-bold">Menu</a></li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;