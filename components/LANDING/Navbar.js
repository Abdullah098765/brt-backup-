"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logoimg from "../../../public/assets/logo.png";
// import { scroller } from "react-scroll";
import { FaDownload } from "react-icons/fa";
import { useMobile } from "../../hooks/useMobile";
import styles from "./styles/landing.module.css";
import { useUserStore } from "../../state/useUserStore";

const NAV_DATA = [
    {
        title: "Categories",
        url: "/#about",
        icon: "",
    },
    {
        title: "About Us",
        url: "https://bragtime.org/#features",
        icon: "",
    },
    {
        title: "Contact Us",
        url: "https://bragtime.org/#privacy",
        icon: "",
    },
    {
        title: "Get the App",
        url: "https://bragtime.org/#faq",
        icon: <FaDownload className="w-5 h-5 text-[#62B46F]" />,
    },
];

const Navbar = () => {
    const [navbar, setNavbar] = useState(false);
    const isMobile = useMobile();
    // const { fetchUserData, user } = useUserStore();
    // console.log("navbar", { user });
    // useEffect(() => {
    //     fetchUserData();
    // }, []);
    return (
        <nav className="w-full shadow absolute top-0 lg:relative z-40">
            <div className="justify-around px-4 mx-auto lg:w-full md:items-center md:flex py-3">
                <div>
                    <div className="flex items-center justify-between  md:block">
                        <Link href="/">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    ease: "linear",
                                    delay: 0.7,
                                    duration: 1.7,
                                }}>
                                <div className="relative z-50 flex justify-start items-center text-center space-x-3 md:space-x-5 lg:space-x-3">
                                    <Image
                                        src={logoimg}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 lg:h-16 lg:w-16 -mt-1 md:ml-2 lg:ml-0"
                                    />
                                    <h1 className="white-text font-semibold text-2xl mdl:text-[35px]">Bragtime</h1>
                                </div>
                            </motion.div>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}>
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex md:flex-1 items-center text-center  pb-3 py-3 -pl-14 md:block md:pb-0 md:mt-0 ${navbar ? "block z-50 w-full h-full bg-[#1B263D]" : "hidden"}`}
                        style={{ zIndex: 6 }}>
                        <ul className={`${isMobile ? "flex flex-col" : ""} mdl:flex-row  items-center text-center space-y-4 mdl:space-x-1 md:flex md:space-y-0 `}>
                            {NAV_DATA.map((item, index) => (
                                <li
                                    className="flex items-center transition duration-75 text-[#b4b7cf] text-[17px] group-hover:text-[#cdda22] hover:scale-110  ease-in-out "
                                    key={index}>
                                    <span className="ml-28 mr-2">{item.icon}</span>
                                    <Link
                                        href={item.url}
                                        onClick={(e) => handleNavItemClick(e, item.url, index)}>
                                        <span className={`${item.title === "Get the App" ? "text-[#62B46F] mr-4" : "white-text"}`}>{item.title}</span>
                                    </Link>
                                </li>
                            ))}

                            {!isMobile && (
                                <Link
                                    href="/signup"
                                    className={`${styles.btnSqr} border border-[#ccc] px-8 py-4 w-28 min-w-28 white-text text-xl
                                     ${styles.btnPurp} flex justify-end text-right hover:brightness-125`}>
                                    Get Started
                                </Link>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
