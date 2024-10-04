import React from 'react';
import Image from "next/image";
import Head from 'next/head';
import Link from "next/link";

const Scholarshippage = () => {
    return (
        <>
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
                        <div className="content">
                            <div className="info-container">
                                <p>ห้องพัฒนาคุณภาพนักศึกษา ชั้น 2 อาคารเรียนรวม 3 ชั้น</p>
                                <p>คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่</p>
                                <p>โทรศัพท์ : 053-944-179</p>
                                <p>Email : studentaffairs@cmu.ac.th</p>
                                <div className="buttons">
                                    <button className="social-btn">f</button>
                                    <Link href="/_notuse/users/scholarship/map" className="map-btn">แผนผังคณะ</Link>
                                    <Link href="/_notuse/users/scholarship/map" className="map-btn">Google Map</Link>
                                </div>
                            </div>


                        </div>
                        
                    </main>
                    <Link href="/users">
                        <div className="return-btn">Return</div>
                    </Link>
                </body>
            </div>

        </>
    )
}

export default Scholarshippage
