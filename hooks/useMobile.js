'use client'
import { useState, useEffect } from "react";

// Hook
export function useMobile() {
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth > 768 ? false : true);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}

export function useTablet() {
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth > 990 ? false : true);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}
export function useDesktop() {
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth > 1024 ? true : false);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}