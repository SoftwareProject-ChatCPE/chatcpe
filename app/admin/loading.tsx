import React from 'react';
import {Spinner} from "flowbite-react";

/**
 * The Loading component renders a full-screen loading indicator.
 *
 * This component centers a spinner and a loading message both
 * horizontally and vertically within the viewport.
 *
 *
 * @returns {JSX.Element} A JSX element that displays a loading
 * indicator with a centered spinner and a "Loading..." message.
 */
const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen text-3xl">
            <Spinner size="xl"/>
            <span className="ml-4 text-lg font-bold">Loading...</span>
        </div>
    );
}

export default Loading;