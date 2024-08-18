"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import logo from "../../public/images/logo.svg";

const Loader = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleLoad = () => setLoading(false); // Set loading to false when page is fully loaded

        document.addEventListener("DOMContentLoaded", () => setLoading(false)); // Set loading to false when DOM content is loaded
        window.addEventListener("load", handleLoad); // Set loading to false when all resources (including images and stylesheets) are loaded

        return () => {
            document.removeEventListener("DOMContentLoaded", () => setLoading(false));
            window.removeEventListener("load", handleLoad);
        };
    }, []);
    return (
        <div
            id="ring"
            className="w-[100vw] h-[100vh] main-bg z-50 relative"
            style={{ display: "block" }}>
            {" "}
            <Image
                src={logo}
                width={120}
                height={120}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
};

export default Loader;
