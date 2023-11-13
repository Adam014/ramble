"use client";

import dynamic from "next/dynamic";

const Provider = ({ children }) => {
    const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
        ssr: false,
    });
    return (
        <>
            <AnimatedCursor color="241,62,81"/>
            {children}
        </>
    )
}

export default Provider
