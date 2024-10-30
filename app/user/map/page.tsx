import React from 'react';
import {Button} from "flowbite-react";
import Link from "next/link";

/**
 * The `page` variable is a React component that renders a web page layout.
 * This layout includes a full-screen height container with background color,
 * text color, and font properties specified through CSS classes.
 *
 * Inside the container, the main content starts with a heading and a
 * section containing a Google Map embed iframe. The map iframe is
 * embedded responsively within a container that adjusts width and height based
 * on the screen size. The iframe is styled with a border, rounded corners,
 * and a shadow.
 *
 * Additionally, there is a button component that serves as a link back to
 * the user page. This button is styled as a pill-shaped element and is fixed
 * to the bottom-right corner of the screen with a specific background color
 * and text color.
 *
 * @returns {JSX.Element} - The JSX code to render the page layout.
 */
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