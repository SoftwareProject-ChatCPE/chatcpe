import React from 'react';
import {Button} from "flowbite-react";
import Link from "next/link";

const page = () => {
    return (
        <>
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h2 className="text-2xl text-[#82659D] mb-5">What Building That You Are Looking For?</h2>
                        <div className="flex flex-wrap justify-center">
                            {/* Google Map Embed */}
                            <div className="w-full h-[500px] lg:w-3/4">
                                <iframe
                                    src="https://www.google.com/maps/d/embed?mid=1nctqKMg8dxs_zASG1yo_RfCxuNcy06w&hl=en&ll=18.79523952538685%2C98.9519929899704&z=18&output=embed"
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    className="border rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                    </section>
                </main>

                <Button as={Link} href="/user"
                        color='light' pill
                        className="fixed bottom-7 right-7 p-1 flex items-center bg-[#9e7fec] text-white"
                >
                    back
                </Button>
            </div>
        </>
    );
}

export default page;