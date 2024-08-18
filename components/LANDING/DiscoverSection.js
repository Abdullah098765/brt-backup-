"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaMicrophoneSlash, FaMicrophone, FaApple, FaGoogle } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";
import button from "next/link";
import { useRouter } from "next/navigation";
import { useMobile } from "../../hooks/useMobile";
import { gsap } from "gsap";
import { SplitText } from "../../plugins";
import { backgroundUrl } from "../../utils/url";
import styles from "./styles/landing.module.css";
import useSmoothScroll from "../../hooks/useSmoothScroll";

const DiscoverSection = () => {
    const router = useRouter();
    const isMobile = useMobile();
    const bgeven1Url = useMemo(() => backgroundUrl("event1.jpg"), []);
    const bgeven2Url = useMemo(() => backgroundUrl("event2.jpg"), []);
    const bgeven3Url = useMemo(() => backgroundUrl("event3.jpg"), []);
    const bgnft1Url = useMemo(() => backgroundUrl("nft1.jpeg"), []);
    const bgnft2Url = useMemo(() => backgroundUrl("nft2.jpg"), []);
    const bgnft3Url = useMemo(() => backgroundUrl("nft3.gif"), []);
    const bgnft4Url = useMemo(() => backgroundUrl("nft4.gif"), []);
    const bgnft5Url = useMemo(() => backgroundUrl("s1.jpg"), []);
    const bgnft5aUrl = useMemo(() => backgroundUrl("m1.png"), []);
    const bgdownload1Url = useMemo(() => backgroundUrl("mockup1.png"), []);
    const bgdownload2Url = useMemo(() => backgroundUrl("mockup2.png"), []);
    const bgbarcodeUrl = useMemo(() => backgroundUrl("Barcode.png"), []);
    const bgchallenge1Url = useMemo(() => backgroundUrl("soccer.jpg"), []);
    const bgchallenge2Url = useMemo(() => backgroundUrl("vs.jpg"), []);
    const bgchallenge3Url = useMemo(() => backgroundUrl("vs2.png"), []);
    const bgchallenge4Url = useMemo(() => backgroundUrl("soccer2.png"), []);
    const bgchallenge5Url = useMemo(() => backgroundUrl("podcast.jpg"), []);
    const bgchallenge6Url = useMemo(() => backgroundUrl("podcast2.jpg"), []);

    const handleSignin = () => {
        router.push("/signin");
    };

    useEffect(() => {
        const elements = document.querySelectorAll(".animated-text");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const splitText = new SplitText(entry.target, { type: "words,chars" });

                    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

                    splitText.chars.forEach((char, index) => {
                        timeline.from(char, { duration: 0.6, opacity: 0, x: 30 }, index * 0.05);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach((element) => {
            observer.observe(element);
        });

        // Cleanup: disconnect the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll(".animated-text2");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const splitText = new SplitText(entry.target, { type: "words,chars" });

                    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

                    splitText.chars.forEach((char, index) => {
                        timeline.from(char, { duration: 0.7, opacity: 0, x: 30 }, index * 0.05);
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach((element) => {
            observer.observe(element);
        });

        // Cleanup: disconnect the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll(".fade-in-image");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target;

                    const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

                    timeline.from(image, { duration: 0.9, opacity: 0, y: 50 });

                    observer.unobserve(image);
                }
            });
        }, observerOptions);

        elements.forEach((element) => {
            observer.observe(element);
        });

        // Cleanup: disconnect the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);

    const images = [`${bgchallenge1Url}`, `${bgchallenge2Url}`, `${bgchallenge3Url}`, `${bgchallenge4Url}`, `${bgchallenge5Url}`, `${bgchallenge6Url}`];

    const groupImages = [
        { id: 1, image: "/images/landing/groups/vc1.png", name: "Aj Lee", talkingIcon: <BsSoundwave className="w-5 h-5 white-text" />, icon: <FaMicrophone className="w-5 h-5 white-text" /> },
        { id: 2, image: "/images/landing/groups/vc2.png", name: "Creed", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 3, image: "/images/landing/groups/vc3.png", name: "Mia", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 4, image: "/images/landing/groups/vc4.png", name: "Grove", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 5, image: "/images/landing/groups/vc5.png", name: "Isabella P", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 6, image: "/images/landing/groups/vc6.png", name: "Sandy", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 7, image: "/images/landing/groups/vc7.png", name: "Garry", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
        { id: 8, image: "/images/landing/groups/vc8.png", name: "K Justin", talkingIcon: null, icon: <FaMicrophoneSlash className="w-5 h-5 white-text" /> },
    ];

    useSmoothScroll();
    return (
        <div className="main-bg2 w-full h-full overflow-hidden flex flex-col justify-center items-center text-center pt-4">
            <section className="w-full">
                <h1
                    className={`mt-8 white-text text-[30px] md:text-[55px] lg:text-[70px] uppercase 
                font-bold text-center leading-5 ${!isMobile ? "animated-text" : ""}`}>
                    Discover
                    <span className={`ml-1 ${!isMobile ? "animated-text" : ""}`}>top</span>
                    <span className={`ml-1 ${styles?.card4Bg} px-2 pt-2 pb-1 rounded-lg ${!isMobile ? "animated-text" : ""}`}>video</span>
                </h1>
                <h1 className="mt-4 mdl:mt-14 white-text text-2xl md:text-[55px] lg:text-[70px] uppercase font-bold text-center leading-5 animated-text">challenges</h1>
                <h3 className="mt-10 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    Participate and win money, get level-up and get rare NFT collectibles. Explore
                </h3>
                <h3 className="mt-2 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    challenges, join and participate in the ones that excites you.
                </h3>
                <button
                    onClick={handleSignin}
                    className="btn-purp white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                    Explore Challenges
                </button>

                <div>
                    <div className="grid grid-cols-3 gap-2 w-full  text-center mx-1 mdl:mx-0">
                        <div className="col-span-1 row-span-2 h-[300px] mdl:h-[400px] ">
                            <img
                                className="object-cover w-full  h-[300px] mdl:h-[400px] rounded-xl fade-in-image"
                                src={images[0]}
                                alt="Image 1"
                            />
                        </div>

                        <div className="col-span-1">
                            <div className="row-span-1 rounded-xl ">
                                <img
                                    className="object-cover w-full h-[150px] mdl:h-[195px]  mb-2 rounded-xl fade-in-image"
                                    src={images[1]}
                                    alt="Image 2"
                                />
                            </div>

                            <div className="row-span-1 rounded-xl ">
                                <img
                                    className="object-cover w-full h-[150px] mdl:h-[195px]  rounded-xl fade-in-image"
                                    src={images[2]}
                                    alt="Image 3"
                                />
                            </div>
                        </div>

                        <div className="col-span-1 row-span-2 h-[300px] mdl:h-[400px] fade-in-image">
                            <img
                                className="object-cover w-full h-[300px] mdl:h-[400px] rounded-xl fade-in-image"
                                src={images[3]}
                                alt="Image 4"
                            />
                        </div>
                    </div>

                    <div className="w-full h-[600px] object-cover mt-4 mdl:mt-12 rounded-xl relative ">
                        <Image
                            src={images[4]}
                            width={900}
                            height={600}
                            alt="image"
                            className="w-full h-[600px] object-cover rounded-xl fade-in-image"
                        />

                        <div
                            className="absolute top-[40%] left-[50%] -transition-x-[50%] -transition-y-[40%] rounded-full 
                    flex justify-center items-center text-center w-20 h-20 bg-[#ffffff59]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff59"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-10 h-10 ">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                />
                            </svg>
                        </div>

                        <div className="absolute bottom-4 w-full px-3">
                            <div className="flex justify-around mdl:justify-between items-center">
                                <div className="flex flex-col text-left">
                                    <h1 className={`white-text text-[30px] mdl:text-[60px] uppercase font-bold text-left ${!isMobile ? "animated-text" : ""}`}>DISCOVER TOP LIVESTREAMS</h1>
                                    <p className="white-text text-[18px] mdl:text-[25px] text-left w-[60%] animated-text2">
                                        Join livestream of your favorites channels. Keep your notification on so you don’t miss out on any livestreams
                                    </p>
                                </div>

                                <button
                                    onClick={handleSignin}
                                    className="rounded-full btn-purp w-64 h-20 mdl:w-28 mdl:h-28 mr-2 flex justify-center items-center text-center">
                                    <HiArrowUpRight className="w-10 h-10 mdl:w-12 mdl:h-12 white-text" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[600px] object-cover mt-4 mdl:mt-12 rounded-xl relative ">
                        <Image
                            src={images[5]}
                            width={900}
                            height={600}
                            alt="image"
                            className="w-full h-[600px] object-cover rounded-xl fade-in-image"
                        />

                        <div className="absolute bottom-4 w-full px-3">
                            <div className="flex justify-around mdl:justify-between items-center">
                                <div className="flex flex-col text-left">
                                    <h1 className={`white-text text-[30px] mdl:text-[60px] uppercase font-bold text-left ${!isMobile ? "animated-text" : ""}`}>DISCOVER TOP CHANNELS</h1>
                                    <p className="white-text text-[18px] mdl:text-[25px] text-left w-[60%] animated-text2">
                                        Create your own independent and decentralized channel. Grow your subscribers and take advantage of the cool features as you level up.
                                    </p>
                                </div>

                                <button
                                    onClick={handleSignin}
                                    className="rounded-full btn-purp w-72 h-20 mdl:w-28 mdl:h-28 mr-2 flex justify-center items-center text-center">
                                    <HiArrowUpRight className="w-10 h-10 mdl:w-12 mdl:h-12 white-text" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 w-full">
                <h1
                    className={`mt-8 white-text text-[30px] md:text-[55px] lg:text-[70px] 
                uppercase font-bold text-center leading-5 ${!isMobile ? "animated-text" : ""}`}>
                    DISCOVER{" "}
                    <span
                        className={`white-text text-2xl md:text-[55px] lg:text-[70px] 
                    ${styles?.card4Bg} px-2 pt-2 pb-1 rounded-lg animated-text`}>
                        GROUPS
                    </span>
                </h1>
                <h1 className="mt-4 mdl:mt-14 white-text text-2xl md:text-[55px] lg:text-[70px] uppercase font-bold text-center leading-5 animated-text">OF YOUR INTEREST</h1>
                <h3 className="mt-10 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    Whether its planning an outing with friends or simply staying on top of
                </h3>
                <h3 className="mt-2 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    your family chats, group conversations should feel effortless.
                </h3>
                <button
                    onClick={handleSignin}
                    className="btn-purp white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                    Explore Groups
                </button>

                <div className="w-full mx-0 mdl:mx-4 h-full btn-blue rounded-xl border border-[#ccc] flex flex-col items-center text-center">
                    <h3 className="my-4 white-text text-2xl mdl:text-4xl text-center">Group Calls</h3>
                    <p className="main-text text-base mdl:text-lg text-center">56:01:05</p>
                    <div className="flex justify-center items-center text-center max-w-screen">
                        <div className="grid grid-cols-2 mdl:grid-cols-4 gap-2 w-full text-center p-4">
                            {groupImages &&
                                groupImages.map((call, index) => (
                                    <div
                                        key={index}
                                        className={`${call?.id === 1 ? "border-4 border-[#fff] rounded-xl  overflow-hidden" : "rounded-lg"} w-[170px] h-[170px] mdl:w-full mdl:h-[250px] relative `}>
                                        <Image
                                            src={call?.image}
                                            width={100}
                                            height={100}
                                            alt="image"
                                            className="w-[170px] h-[170px] mdl:w-full mdl:h-[250px] rounded-lg overflow-hidden  fade-in-image"
                                        />

                                        <div className="absolute bottom-2 left-2 flex space-x-3">
                                            <div
                                                className="px-2 py-2 btn-purp max-w-12 rounded-full 
                                flex justify-center items-center text-center white-text space-x-2">
                                                <span>{call?.talkingIcon}</span>
                                                <span>{call?.name}</span>
                                            </div>
                                            <div
                                                className="px-2 py-2 btn-purp max-w-12 rounded-full 
                                flex justify-center items-center text-center">
                                                {call?.icon}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-20 w-full">
                <h1
                    className={`mt-8 white-text text-[30px] md:text-[55px] lg:text-[70px] 
                uppercase font-bold text-center leading-5 ${!isMobile ? "animated-text" : ""}`}>
                    DISCOVER TOP
                    <span
                        className={`white-text text-2xl md:text-[55px] lg:text-[70px] 
                    ${styles?.card4Bg} px-2 pt-2 pb-1 rounded-lg animated-text`}>
                        EVENTS
                    </span>
                </h1>

                <h3 className="mt-10 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    Whether your planning an outing with friends, a business meetup, a virtual event or concert,
                </h3>
                <h3 className="mt-2 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    or simply organizing a fundraiser or reunion, create a free, paid, or private event now.
                </h3>
                <div className="flex justify-center items-center space-x-3">
                    <button
                        onClick={handleSignin}
                        className="btn-purp white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                        Create Event
                    </button>
                    <button
                        onClick={handleSignin}
                        className="btn-blue white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                        Explore Events
                    </button>
                </div>

                <div className="relative flex justify-around items-end mt-16 mdl:mt-0">
                    <Image
                        src={bgeven1Url}
                        width={400}
                        height={400}
                        alt="event"
                        className="absolute w-[150px] h-[300px] mdl:w-[500px] mdl:h-[500px] object-cover rounded-xl -rotate-12 -left-5 mdl:left-20 mdl:-ml-4 fade-in-image"
                    />
                    <Image
                        src={bgeven2Url}
                        width={450}
                        height={450}
                        alt="event"
                        className="w-[190px] h-[300px] mdl:w-[490px] mdl:h-[510px] object-cover rounded-xl z-10 mb-[20px] mdl:mb-[42px]  fade-in-image"
                    />
                    <Image
                        src={bgeven3Url}
                        width={400}
                        height={400}
                        alt="event"
                        className="absolute w-[150px] h-[300px] mdl:w-[500px] mdl:h-[500px] object-cover rounded-xl rotate-12 -right-5 mdl:right-20 mdl:-mr-4 fade-in-image"
                    />
                </div>
            </section>

            <section className="mt-20 w-full">
                {!isMobile && (
                    <>
                        <h1 className="mt-8 white-text text-[30px] md:text-[55px] lg:text-[70px] uppercase font-bold text-center leading-5 animated-text">DISCOVER BEST SELLING</h1>
                        <h1 className="white-text text-2xl md:text-[55px] lg:text-[70px] font-bold text-center my-14">
                            <span
                                className={`white-text text-2xl md:text-[55px] lg:text-[70px] 
                    ${styles?.card4Bg} px-2 pt-2 pb-1 rounded-lg animated-text font-bold`}>
                                NFTs
                            </span>
                        </h1>
                    </>
                )}
                {isMobile && (
                    <>
                        <h1
                            className="mt-8 white-text text-[30px] md:text-[55px] lg:text-[70px] uppercase 
                font-bold text-center leading-5 ">
                            DISCOVER BEST
                        </h1>
                        <h1 className="white-text text-2xl md:text-[55px] lg:text-[70px] font-bold text-center my-14">
                            SELLING{" "}
                            <span
                                className={`white-text text-2xl md:text-[55px] lg:text-[70px] 
                    ${styles?.card4Bg} px-2 pt-2 pb-1 rounded-lg animated-text font-bold`}>
                                NFTs
                            </span>
                        </h1>
                    </>
                )}

                <h3 className="mt-10 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    Auction, sell, buy, gift, trade, and create your own digital assets in the form of NFTs
                </h3>
                <h3 className="mt-2 main-text text-xl md:text-[15px] lg:text-[20px] px-4 ml:px-40 animated-text2 text-left mdl:text-center">
                    You own it. Make a profit on Bragtime NFT collectibles as it grows in value
                </h3>
                <div className="flex justify-center items-center space-x-3">
                    <button
                        onClick={handleSignin}
                        className="btn-purp white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                        Mint NFT
                    </button>
                    <button
                        onClick={handleSignin}
                        className="btn-blue white-text text-lg px-6 py-4 border border-[#ccc] my-8 rounded-xl hover:brightness-125">
                        Explore Auctions
                    </button>
                </div>

                <div className="mt-12 flex flex-col justify-center items-center text-center w-full">
                    <div className="w-full h-full flex items-center">
                        <div className="w-full h-[250px] mdl:w-full mdl:h-[650px] rounded-tl-xl relative">
                            <Image
                                src={bgnft1Url}
                                width={400}
                                height={650}
                                alt="nfts"
                                className="w-full h-[250px] mdl:w-full mdl:h-[650px] rounded-tl-xl"
                            />
                            <div
                                className="absolute bottom-2 right-2 flex flex-col justify-center  text-left
                                w-[130px] h-[90px] mdl:w-[250px] h-[170px] btn-offwhite2 rounded-lg px-2 py-1 mdl:px-3 mdl:py-3">
                                <h2 className="black-text text-base mdl:text-2xl text-left">King Jacked</h2>
                                {!isMobile && <p className="black-text text-base mdl:text-lg mdl:my-1 mdl:my-2 text-left">Highest Bid</p>}
                                <div className="flex space-x-2">
                                    <span className="text-lg black-text mdl:text-4xl font-bold text-left">6.8</span>
                                    <span className="uppercase black-text text-base mdl:text-lg text-left">Eth</span>
                                </div>

                                <div className="mt-1 mdl:mt-3 dark-green-text font-bold flex space-x-3">
                                    <span>Place Bid</span>
                                    <HiArrowUpRight className="w-4 h-4 dark-green-text font-bold" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[250px] mdl:w-full mdl:h-[650px] rounded-tr-xl relative">
                            <Image
                                src={bgnft2Url}
                                width={400}
                                height={650}
                                alt="nfts"
                                className="w-full h-[250px] mdl:w-full mdl:h-[650px] rounded-tr-xl"
                            />
                            <div
                                className="absolute bottom-2 right-2 flex flex-col justify-center  text-left
                                w-[130px] h-[90px] mdl:w-[250px] h-[170px] btn-offwhite2 rounded-lg px-2 py-1 mdl:px-3 mdl:py-3">
                                <h2 className="black-text text-base mdl:text-2xl text-left">Kid Kaboom</h2>
                                {!isMobile && <p className="black-text text-base mdl:text-lg mdl:my-1 mdl:my-2 text-left">Highest Bid</p>}

                                <div className="flex space-x-2">
                                    <span className="text-lg black-text mdl:text-4xl font-bold text-left">2.09</span>
                                    <span className="uppercase black-text text-base mdl:text-lg text-left">Eth</span>
                                </div>

                                <button
                                    onClick={handleSignin}
                                    className="mt-3 dark-green-text font-bold flex space-x-3">
                                    <span>Place Bid</span>
                                    <HiArrowUpRight className="w-4 h-4 dark-green-text font-bold" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center">
                        <div className="w-full h-[250px] mdl:w-full mdl:h-[650px] relative ">
                            <Image
                                src={bgnft3Url}
                                width={400}
                                height={650}
                                alt="nfts"
                                className="w-full h-[250px] mdl:w-full mdl:h-[650px]"
                            />
                            <div
                                className="absolute bottom-2 right-2 flex flex-col justify-center  text-left
                                w-[130px] h-[90px] mdl:w-[250px] h-[170px] btn-offwhite2 rounded-lg px-2 py-1 mdl:px-3 mdl:py-3">
                                <h2 className="black-text text-base mdl:text-2xl text-left">Queen Flashy</h2>
                                {!isMobile && <p className="black-text text-base mdl:text-lg mdl:my-1 mdl:my-2 text-left">Highest Bid</p>}

                                <div className="flex space-x-2">
                                    <span className="text-lg black-text mdl:text-4xl font-bold text-left">5.02</span>
                                    <span className="uppercase black-text text-base mdl:text-lg text-left">Eth</span>
                                </div>

                                <div className="mt-3 dark-green-text font-bold flex space-x-3">
                                    <span>Place Bid</span>
                                    <HiArrowUpRight className="w-4 h-4 dark-green-text font-bold" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[250px] mdl:w-full mdl:h-[650px] relative">
                            <Image
                                src={bgnft4Url}
                                width={400}
                                height={650}
                                alt="nfts"
                                className="w-full h-[250px] mdl:w-full mdl:h-[650px]"
                            />
                            <div
                                className="absolute bottom-2 right-2 flex flex-col justify-center  text-left
                                w-[130px] h-[90px] mdl:w-[250px] h-[170px] btn-offwhite2 rounded-lg px-2 py-1 mdl:px-3 mdl:py-3">
                                <h2 className="black-text text-base mdl:text-2xl text-left">King Golden</h2>
                                {!isMobile && <p className="black-text text-base mdl:text-lg mdl:my-1 mdl:my-2 text-left">Highest Bid</p>}

                                <div className="flex space-x-2">
                                    <span className="text-lg black-text mdl:text-4xl font-bold text-left">9.4</span>
                                    <span className="uppercase black-text text-base mdl:text-lg text-left">Eth</span>
                                </div>

                                <div className="mt-3 dark-green-text font-bold flex space-x-3">
                                    <span>Place Bid</span>
                                    <HiArrowUpRight className="w-4 h-4 dark-green-text font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center bg-[#30343d] rounded-br-xl">
                        <div className="w-[150px] h-[250px] mdl:w-[600px] mdl:h-[600px] relative rounded-br-xl relative">
                            {!isMobile ? (
                                <Image
                                    src={bgnft5Url}
                                    width={600}
                                    height={600}
                                    alt="nfts"
                                    className="w-full h-[200px] mdl:w[600px] mdl:h-[600px] "
                                />
                            ) : (
                                <Image
                                    src={bgnft5aUrl}
                                    width={150}
                                    height={250}
                                    alt="nfts"
                                    className="w-[150px] h-[250px] mdl:w[600px] mdl:h-[600px] absolute -left-20"
                                />
                            )}
                            <div
                                className="absolute bottom-2 -right-14 mdl:right-2 flex flex-col justify-center  text-left
                                w-[130px] h-[100px] mdl:w-[250px] h-[170px] btn-offwhite2 rounded-lg px-2 py-1 mdl:px-3 mdl:py-3">
                                <h2 className="main-text text-base mdl:text-2xl text-left">Monster Dino</h2>
                                <p className="main-text text-base mdl:text-lg my-1 mdl:my-2 text-left">Highest Bid</p>

                                <div className="flex space-x-2">
                                    <span className="text-lg main-text mdl:text-4xl font-bold text-left">4.6</span>
                                    <span className="uppercase main-text text-base mdl:text-lg text-left">Eth</span>
                                </div>

                                <div className="mt-3 dark-green-text font-bold flex space-x-3">
                                    <span>Place Bid</span>
                                    <HiArrowUpRight className="w-4 h-4 dark-green-text font-bold" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-1 mdl:my-8 w-full h-auto mdl:h-[450px] bg-[#062D5A]">
                <div className="flex justify-center items-center w-full  p-4">
                    <div className="flex flex-col w-1/3 justify-center ">
                        {!isMobile && (
                            <>
                                <h1 className="white-text font-bold text-2xl mdl:text-[40px] text-left mb-4 leading-10">Download Bragtime today! It is now available on IOS and Android</h1>

                                <div className="flex items-left text-left space-x-5 justify-start mt-44 mdl:mt-0">
                                    <div className="w-auto h-auto btn-purp white-text rounded-lg flex items-center space-x-3 px-3 py-1">
                                        <FaApple className="w-8 h-8 white-text" />
                                        <div className="flex flex-col">
                                            <p className="main-text my-1 text-base">Download app on</p>
                                            <p className="main-text my-1 text-xl">Apple Store</p>
                                        </div>
                                    </div>
                                    <div className="w-auto h-auto btn-purp white-text rounded-lg flex items-center space-x-3 px-3 py-1">
                                        <FaGoogle className="w-7 h-7 white-text" />
                                        <div className="flex flex-col">
                                            <p className="main-text text-base my-1">Download app on</p>
                                            <p className="main-text my-1 text-xl">Play Store</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col w-1/3 justify-center items-center">
                        <div className="flex -ml-24 mdl:-ml-0">
                            <div className="w-[125px] h-auto mdl:w-[200px] mdl:h-auto object-contain mdl:object-cover rounded-lg z-10">
                                <Image
                                    src={bgdownload1Url}
                                    width={200}
                                    height={350}
                                    alt="download app"
                                    className="w-[125px] h-auto mdl:w-[200px] object-contain mdl:object-cover rounded-lg"
                                />
                            </div>
                            <div className="w-[125px] h-auto mdl:w-[200px] mdl:h-auto object-contain mdl:object-cover rounded-lg z-20 -ml-14 mt-6">
                                <Image
                                    src={bgdownload2Url}
                                    width={200}
                                    height={350}
                                    alt="download app"
                                    className="w-[125px] h-auto mdl:w-[200px] object-contain mdl:object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/3 justify-center items-center -mr-8 ">
                        <div className="w-[75px] h-auto mdl:w-[300px] mdl:h-auto object-contain mdl:object-cover rounded-lg z-20 -ml-0 mdl:-ml-14 mt-6 contents">
                            <Image
                                src={bgbarcodeUrl}
                                width={300}
                                height={350}
                                alt="download app"
                                className="w-[75px] h-auto mdl:w-[200px] object-contain mdl:object-cover rounded-lg"
                            />
                        </div>
                        <div className="text-center">
                            <h2 className="white-text mt-4 font-bold text-left w-min text-base mdl:text-2xl mdl:w-max mdl:ml-0">Scan to Download</h2>
                            <h2 className="white-text my-1 font-bold text-lg mdl:text-2xl">Bragtime</h2>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    {isMobile && (
                        <div className="flex pb-4 justify-center items-center space-x-3">
                            <div className="w-auto h-auto btn-purp white-text rounded-lg flex items-center space-x-1 px-3 py-1">
                                <FaApple className="w-7 h-7 white-text" />
                                <div className="flex flex-col">
                                    <p className="main-text my-1 text-[12px]">Download app on</p>
                                    <p className="main-text my-1 text-[14px]">Apple Store</p>
                                </div>
                            </div>
                            <div className="w-auto h-auto btn-purp white-text rounded-lg flex items-center space-x-1 px-3 py-1">
                                <FaGoogle className="w-7 h-7 white-text" />
                                <div className="flex flex-col">
                                    <p className="main-text text-[12px] my-1">Download app on</p>
                                    <p className="main-text my-1 text-[14px]">Play Store</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DiscoverSection;
