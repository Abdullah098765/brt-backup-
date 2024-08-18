"use client";
import { useState, useEffect } from "react";

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState({ height: 0, width: 0 });

    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial dimensions

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

export default useWindowDimensions;
