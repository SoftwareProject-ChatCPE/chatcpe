"use client";
import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";
import CircleFollowMouse from '../../components/CircleFollowMouse';

const Selectpage = () => {
  return (
    <>
      <CircleFollowMouse />
      <div className='context'>
        <div className="login-container">

          <body>

            <header>
              <div className="header-left">
                <h1>ChatCPE</h1>
                <p>a basic screening bot</p>
              </div>
              <nav>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Find</a></li>
                  <li><a href="#">Menu</a></li>
                </ul>
              </nav>
            </header>
            <main>
              <section>
                <h2>What Info Are You Seeking For?</h2>
                <div className="button-container">
                  <Link href="/_notuse/users/scholarship" className='schor-bth'>Scholarship</Link>
                  <button>Professor's Contact</button>
                  <button>Finding Classroom</button>
                  <button>30th Anniversary Building</button>
                  
                </div>
              </section>
            </main>
          </body>
        </div>
      </div>
    </>
  )
}

export default Selectpage
