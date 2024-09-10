"use client";
import React from 'react';
import Link from "next/link";
import CircleFollowMouse from '../../components/CircleFollowMouse';
import Navbar from "../../components/navbar";

const Selectpage = () => {
  return (
    <>
      <Navbar />
      <CircleFollowMouse />
      <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
        <main className="mt-32 p-5">
          <section>
            <h2 className="text-2xl text-[#82659D] mb-5">What Info Are You Seeking For?</h2>
            <div className="flex flex-wrap justify-center">
              <Link href="/scholarship" className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                Scholarship
              </Link>
              <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                Professor's Contact
              </button>
              <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                Finding Classroom
              </button>
              <button className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                30th Anniversary Building
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Selectpage;
