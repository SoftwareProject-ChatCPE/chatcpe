import React from 'react';
import {Spinner} from "flowbite-react";

/**
 * A functional React component that renders a fullscreen loading indicator.
 *
 * This component displays a spinner accompanied by a "Loading..." text message.
 * It uses Tailwind CSS classes for styling:
 *
 *
 * @returns {JSX.Element} A JSX element representing a loading screen.
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