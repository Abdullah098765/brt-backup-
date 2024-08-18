"use client";
import useAuth from "../../hooks/useAuth";
import React, { useEffect, useState } from "react";
// import "@/src/app/globals.css";
import logo from "../../../public/assets/logo.png";
import google from "../../../public/images/auth/google.png";
import metamask from "../../../public/images/auth/metamask.svg";
import { useMobile } from "../../hooks/useMobile";
import { FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import CheckmarkIcon from "../COMMON/CheckmarkIcon";
import Link from "next/link";
import gsap from "gsap";
const fadeImages = [
    "/images/auth/s1.jpg",
    "/images/auth/s2.png",
    "/images/auth/s3.jpg",
    "/images/auth/s4.png",
    "/images/auth/s5.png",
    "/images/auth/s1.jpg",
    "/images/auth/s2.png",
    "/images/auth/s3.jpg",
    "/images/auth/s4.png",
    "/images/auth/s5.png",
];

const fadeMobileImages = [
    "/images/auth/m1.png",
    "/images/auth/m2.png",
    "/images/auth/m3.png",
    "/images/auth/m4.png",
    "/images/auth/m5.png",
    "/images/auth/m1.png",
    "/images/auth/m2.png",
    "/images/auth/m3.png",
    "/images/auth/m4.png",
    "/images/auth/m5.png",
];

const Signup = () => {
    const isMobile = useMobile();
    const ShowIcon = () => (
        <div className="w-[25px] h-[25px] flex items-center justify-center relative object-contain text-[#D81A77]">
            <FaEyeSlash className="green-text w-10 h-10 font-semibold" />
        </div>
    );

    const HideIcon = () => (
        <div className="w-[25px] h-[25px] flex items-center justify-center relative object-contain red-text">
            <FaEye className="red-text w-10 h-10 font-semibold" />
        </div>
    );

    useEffect(() => {
        async function runFade() {
            const images = document.querySelectorAll(".fade-image");
            const duration = 2.5;
            const fadeInDuration = 1;
            const visibleDuration = 1.5;

            images.forEach((image, index) => {
                const fadeInDelay = index * (fadeInDuration + visibleDuration);
                const fadeOutDelay = fadeInDelay + fadeInDuration + visibleDuration;

                const fadeInAnimation = gsap.fromTo(image, { opacity: 0 }, { opacity: 1, duration: fadeInDuration, delay: fadeInDelay });

                const visibleAnimation = gsap.to(image, {
                    opacity: 1,
                    duration: visibleDuration,
                    delay: fadeInDelay + fadeInDuration,
                });

                const fadeOutAnimation = gsap.to(image, {
                    opacity: 0,
                    duration: fadeInDuration,
                    delay: fadeOutDelay,
                });

                const nextIndex = (index + 1) % images.length;
                const nextImage = images[nextIndex];
                const nextStartTime = fadeInDelay + fadeInDuration + visibleDuration;

                const nextFadeInAnimation = gsap.fromTo(nextImage, { opacity: 0 }, { opacity: 1, duration: fadeInDuration, delay: nextStartTime });

                fadeInAnimation.then(() => {
                    visibleAnimation.then(() => {
                        fadeOutAnimation.then(() => {
                            nextFadeInAnimation.restart();
                        });
                    });
                });
            });
        }
        runFade();
        return () => {
            // Clean up animations if needed
        };
    }, []);
    const variants = {
        hidden: { opacity: 0, x: "75px" },
        visible: { opacity: 1, x: 0 },
    };
    const [isAccepted, setIsAccepted] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [credential, setCredential] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [IsEmailSigningUp, setIsEmailSigningUp] = useState(false);
    const { handleEmailPasswordSignUp, handleGoogleSignIn, connectMetamask, walletAddress, disconnectWallet } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredential((prevcredential) => ({
            ...prevcredential,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEmailSigningUp(true);
        await handleEmailPasswordSignUp(credential, setIsEmailSigningUp);
        console.log("Form data submitted:", credential);
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    useEffect(() => {
        if (!credential?.firstname?.trim() || !credential?.lastname.trim() || !credential?.email.trim() || !credential?.password.trim()) {
            console.log("Invailid form Data step == 1");
            setIsButtonDisabled(true);
        } else {
            setIsButtonDisabled(false);
        }
        if (!isAccepted) {
            setIsButtonDisabled(true);
        }
    }, [credential, isAccepted]);
    return (
        <div
            data-aos="fade-up"
            data-aos-duration="500"
            className="w-screen h-screen main-bg min-h-screen min-w-screen flex items-center overflow-hidden bg-gray-800">
            <div className="flex flex-col items-center text-center mdl:px-44  w-full h-full mt-3 z-50">
                <div className="flex items-center justify-center space-x-2 w-full text-center ">
                    <Image
                        src={logo}
                        width={35}
                        height={35}
                        alt="logo"
                        className="w-7 h-7 rounded-full object-cover"
                    />
                    <h1 className="white-text text-xl">Bragtime</h1>
                </div>
                <h1 className="mb-1 mt-1 white-text font-bold text-center text-2xl mdl:text-[30px]">Create Account</h1>

                <>
                    <div className="w-full pl-3 pr-3 mdl:pl-0 mdl:pr-0">
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full py-3  rounded-lg bg-[#484852e0] flex justify-center 
              items-center text-center space-x-3 my-1 hover:bg-[#ffffff25] ">
                            <div className="w-8 h-8 object-cover">
                                <Image
                                    src={google}
                                    width={40}
                                    height={40}
                                    className="w-8 h-8 object-cover"
                                />
                            </div>
                            <h2 className="white-text text-lg">Sign up with Google</h2>
                        </button>
                        <button
                            className="w-full py-3  rounded-lg bg-[#484852e0] flex justify-center 
              items-center text-center space-x-3 my-1 hover:bg-[#ffffff25] ">
                            <FaPhone className="w-6 h-6 text-[#A62FCD] -ml-5" />
                            <h2 className="white-text text-lg">Sign up by Phone</h2>
                        </button>
                        <button
                            onClick={connectMetamask}
                            className="w-full py-3  rounded-lg bg-[#484852e0] flex justify-center 
              items-center text-center space-x-3 my-1 hover:bg-[#ffffff25]">
                            <div className="w-6 h-6 object-cover">
                                <Image
                                    src={metamask}
                                    width={30}
                                    height={30}
                                    className="w-6 h-6 object-cover"
                                />
                            </div>
                            <h2 className="white-text text-lg">Connect Metamask</h2>
                        </button>
                    </div>

                    <div className="w-full h-full">
                        <motion.div
                            id="step3"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            <div className="flex flex-row space-x-4  w-full h-full px-3 mdl:px-0">
                                <div className="flex flex-col w-1/2 my-0">
                                    <label className="white-text text-base mdl:text-lg flex items-center h-14">
                                        {credential.firstname ? (
                                            <div className="flex space-x-1 items-center py-0 my-0">
                                                <h2 className="mr-1">{credential.firstname + " "}</h2> <CheckmarkIcon className="w-6 h-6 m-0 p-0" />
                                            </div>
                                        ) : (
                                            <span>First name</span>
                                        )}
                                    </label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        value={credential.firstname}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white rounded-lg pl-6 text-lg "
                                        placeholder="Your first Name"
                                    />
                                </div>
                                <div className="flex flex-col w-1/2 my-0">
                                    <label className="white-text text-base mdl:text-lg flex items-center h-14">
                                        {credential.lastname ? (
                                            <div className="flex space-x-1 items-center py-0 my-0">
                                                <h2 className="mr-1">{credential.lastname + " "}</h2> <CheckmarkIcon className="w-6 h-6 m-0 p-0" />
                                            </div>
                                        ) : (
                                            <span>Last name</span>
                                        )}
                                    </label>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        value={credential.lastname}
                                        onChange={handleChange}
                                        className="w-full h-14 bg-white rounded-lg pl-6 text-lg"
                                        placeholder="Your last Name"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col text-left my-1 w-full px-3 mdl:px-0">
                                <label className="white-text text-base mdl:text-lg  w-full">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    value={credential.email}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-white rounded-lg pl-6 text-lg"
                                    placeholder="Your email"
                                />
                            </div>
                            <div className="flex flex-col text-left my-1 w-full px-3 mdl:px-0 relative">
                                <label className="white-text text-base   w-full">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={credential.password}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-white rounded-lg pl-6 text-lg"
                                    placeholder="Your password"
                                />
                                {credential.password && (
                                    <div
                                        className="absolute right-5 mdl:right-3 top-10 cursor-pointer"
                                        onClick={handleTogglePassword}>
                                        {showPassword ? <HideIcon /> : <ShowIcon />}
                                    </div>
                                )}
                                <div className="flex items-center text-left space-x-3 w-full my-2 px-3 mdl:px-0">
                                    <input
                                        onChange={() => setIsAccepted(!isAccepted)}
                                        type="checkbox"
                                        className="w-4 h-4"
                                    />
                                    {!isMobile ? (
                                        <p className="main-text text-base text-white">Accept the Terms and conditions and privacy policy</p>
                                    ) : (
                                        <p className="main-text text-base text-white">Accept the Terms & conditions & privacy</p>
                                    )}
                                </div>

                                <button
                                    disabled={isButtonDisabled}
                                    onClick={handleSubmit}
                                    className={` py-4 white-text rounded-lg my-1 border border-[#ccc]  px-3 mdl:px-0 ${
                                        isButtonDisabled ? "bg-[gray] cursor-not-allowed" : "btn-purp hover:brightness-125"
                                    }`}>
                                    {IsEmailSigningUp ? "Signing Up..." : " Create Account"}
                                </button>
                            </div>
                        </motion.div>
                        <Link
                            href="/login"
                            className="main-text">
                            Have an account login
                        </Link>
                    </div>
                </>
            </div>
            {!isMobile ? (
                <div className="absolute z-30 mdl:flex flex-col items-center text-center w-full h-full  mdl:relative">
                    {fadeImages.map((path, index) => (
                        <div
                            key={index}
                            className="fade-image absolute w-full h-full">
                            <Image
                                src={path}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full"
                                layout="fill"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="absolute z-30 mdl:flex flex-col items-center text-center w-full h-full  mdl:relative">
                    {fadeMobileImages.map((path, index) => (
                        <div
                            key={index}
                            className="fade-image absolute w-full h-full">
                            <Image
                                src={path}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full"
                                layout="fill"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Signup;
