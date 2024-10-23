import React from 'react';
import {Spinner} from "flowbite-react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen text-3xl">
            <Spinner size="xl"/>
            <span className="ml-4 text-lg font-bold">Loading...</span>
        </div>
    );
}

export default Loading;