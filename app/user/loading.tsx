import React from 'react';
import {Spinner} from "flowbite-react";

/**
 * A functional React component that renders a fullscreen loading indicator.
 *
 * This component displays a spinner accompanied by a "Loading..." text message.
 * It uses Tailwind CSS classes for styling:
 * - `flex` to enable flexbox layout.
 * - `items-center` and `justify-center` to center the content both vertically and horizontally.
 * - `h-screen` to make the component take the full height of the screen.
 * - `text-3xl` for large text size indicating loading.
 *
 * The spinner component has a size of "xl" to make it more prominent.
 * The text message "Loading..." is styled with margin (`ml-4`),
 * larger text size (`text-lg`), and bold font (`font-bold`).
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