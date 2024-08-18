"use client";
// import { MIN_LEVEL_CATEGORY_LOCK } from "@/src/const/accessLevel";
// import useAuth from "@/src/hooks/useAuth";
import React, { useState } from "react";
import { challengeArray } from "./main/CategoryGridData";
import { motion, AnimatePresence } from "framer-motion";
import style from "../../styles/Challenges.module.css";
import StepperHeader from "./main/StepperHeader";
import { hasAccessToVideoChallengeCategory } from "../../utils/accessLevels";
import uniqBy from "lodash/uniqBy";
import Image from "next/image";
const CHALLENGE_MAX_LEVEL = 5;

const SliderModal = ({}) => {
    const [step, setStep] = useState(1);
    // const { user } = useAuth();
    const [challengeData, setChallengeData] = useState({
        title: null,
        description: null,
        category: null,
        option: null,
        owner: "user?._id",
        videos: [
            {
                title: null,
                description: null,
                videoUrl: null,
                thumbnailUrl: null,
                category: "null",
                views: 0,
            },
        ],
    });
    const [selectedChoice, setSelectedChoice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Beginner");

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // setStep(step + 1);
    };

    const rightIcon = (
        <svg
            width="22"
            height="14"
            viewBox="0 0 30 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.66797 12.0184L9.8731 20.1666L28.3346 1.83325"
                stroke="#78F078"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );

    const lockIcon = (
        <svg
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.5 8.5V6.5C14.5 3.73858 12.2614 1.5 9.5 1.5C6.73858 1.5 4.5 3.73858 4.5 6.5V8.5M9.5 13V15M6.3 19.5H12.7C14.3802 19.5 15.2202 19.5 15.862 19.173C16.4265 18.8854 16.8854 18.4265 17.173 17.862C17.5 17.2202 17.5 16.3802 17.5 14.7V13.3C17.5 11.6198 17.5 10.7798 17.173 10.138C16.8854 9.57354 16.4265 9.1146 15.862 8.82698C15.2202 8.5 14.3802 8.5 12.7 8.5H6.3C4.61984 8.5 3.77976 8.5 3.13803 8.82698C2.57354 9.1146 2.1146 9.57354 1.82698 10.138C1.5 10.7798 1.5 11.6198 1.5 13.3V14.7C1.5 16.3802 1.5 17.2202 1.82698 17.862C2.1146 18.4265 2.57354 18.8854 3.13803 19.173C3.77976 19.5 4.61984 19.5 6.3 19.5Z"
                stroke="#F1DA60"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );

    const renderStepContent = () => {
        const level = "user?.level";
        let challengesArray = [];
        // if (level <= MIN_LEVEL_CATEGORY_LOCK) {
        //     challengeArray.map((i) => {
        //         if (level === MIN_LEVEL_CREATE_CHALLENGE_GENERAL) {
        //             if (i.title === "General" || i.title === "Beginner") {
        //                 challengesArray.push({ ...i, disabled: false });
        //             } else {
        //                 challengesArray.push({ ...i, disabled: true });
        //             }
        //         } else if (level === MIN_LEVEL_CREATE_CHALLENGE) {
        //             if (i.title === "Beginner") {
        //                 challengesArray.push({ ...i, disabled: false });
        //             } else {
        //                 challengesArray.push({ ...i, disabled: true });
        //             }
        //         } else {
        //             challengesArray.push({ ...i, disabled: true });
        //         }
        //     });
        // } else {
        //     challengesArray = challengeArray;
        // }

        switch (step) {
            case 1:
                return (
                    <div className="relative mt-[5%]">
                        <motion.div
                            initial={{ opacity: 0, y: -300, x: 10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                            className="max-w-3xl h-full text-center border border-[#b133db] rounded-3xl overflow-hidden"
                            key="step1">
                            <div className="bg-gradient-to-t to-[#57198a] from-[#b133db] border border-[#b133db] w-[95vw] md:w-[75vw] lg:w-[50vw] h-32 ">
                                <h1
                                    sty
                                    className={`${style["gradientColorText"]} absolute mt-2 top-1 left-1/2 -translate-x-1/2 sm:w-[40vw] text-base font-bold md:text-xl lg:text-4xl text-[#fff]  py-2`}>
                                    CREATE A CHALLENGE
                                </h1>
                                <span
                                    onClick={() => {
                                        // setAddChallenge(!addChallenge);
                                    }}
                                    className="absolute top-0 right-1 !cursor-pointer">
                                    <svg
                                        width="60"
                                        height="60"
                                        viewBox="0 0 105 106"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_ddd_82_861)">
                                            <path
                                                d="M75.0768 30.5824C75.5521 31.0732 75.9291 31.656 76.1864 32.2975C76.4436 32.939 76.576 33.6267 76.576 34.3211C76.576 35.0156 76.4436 35.7032 76.1864 36.3448C75.9291 36.9863 75.5521 37.5691 75.0768 38.0599L59.8335 53.8128L73.5126 67.9487C74.4718 68.9403 75.0106 70.2852 75.0106 71.6875C75.0106 73.0898 74.4718 74.4347 73.5126 75.4262C72.5534 76.4178 71.2525 76.9749 69.896 76.9749C68.5395 76.9749 67.2386 76.4178 66.2794 75.4262L52.6054 61.285L38.9314 75.4262C37.9722 76.4178 36.6713 76.9749 35.3148 76.9749C33.9583 76.9749 32.6574 76.4178 31.6982 75.4262C30.739 74.4347 30.2002 73.0898 30.2002 71.6875C30.2002 70.2852 30.739 68.9403 31.6982 67.9487L45.3773 53.8128L30.134 38.0599C29.6591 37.5685 29.2824 36.9853 29.0255 36.3435C28.7686 35.7017 28.6365 35.0138 28.6367 34.3193C28.637 33.6247 28.7695 32.9369 29.0269 32.2953C29.2842 31.6537 29.6613 31.0707 30.1366 30.5797C30.6118 30.0887 31.176 29.6994 31.7968 29.4338C32.4177 29.1682 33.0831 29.0316 33.755 29.0319C34.4269 29.0321 35.0921 29.1692 35.7128 29.4352C36.3335 29.7012 36.8974 30.091 37.3723 30.5824L52.6054 46.3459L67.8436 30.5877C68.3184 30.0963 68.8821 29.7066 69.5027 29.4406C70.1233 29.1747 70.7884 29.0378 71.4602 29.0378C72.132 29.0378 72.7971 29.1747 73.4177 29.4406C74.0383 29.7066 74.602 30.0963 75.0768 30.5877V30.5824Z"
                                                fill="#DBF3FE"
                                            />
                                        </g>
                                        <defs>
                                            <filter
                                                id="filter0_ddd_82_861"
                                                x="0.384586"
                                                y="0.779728"
                                                width="104.442"
                                                height="104.447"
                                                filterUnits="userSpaceOnUse"
                                                color-interpolation-filters="sRGB">
                                                <feFlood
                                                    flood-opacity="0"
                                                    result="BackgroundImageFix"
                                                />
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                    result="hardAlpha"
                                                />
                                                <feOffset />
                                                <feGaussianBlur stdDeviation="5.13675" />
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
                                                />
                                                <feBlend
                                                    mode="overlay"
                                                    in2="BackgroundImageFix"
                                                    result="effect1_dropShadow_82_861"
                                                />
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                    result="hardAlpha"
                                                />
                                                <feOffset />
                                                <feGaussianBlur stdDeviation="14.1261" />
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.22 0"
                                                />
                                                <feBlend
                                                    mode="overlay"
                                                    in2="effect1_dropShadow_82_861"
                                                    result="effect2_dropShadow_82_861"
                                                />
                                                <feColorMatrix
                                                    in="SourceAlpha"
                                                    type="matrix"
                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                    result="hardAlpha"
                                                />
                                                <feOffset />
                                                <feGaussianBlur stdDeviation="10.9156" />
                                                <feColorMatrix
                                                    type="matrix"
                                                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.44 0"
                                                />
                                                <feBlend
                                                    mode="normal"
                                                    in2="effect2_dropShadow_82_861"
                                                    result="effect3_dropShadow_82_861"
                                                />
                                                <feBlend
                                                    mode="normal"
                                                    in="SourceGraphic"
                                                    in2="effect3_dropShadow_82_861"
                                                    result="shape"
                                                />
                                            </filter>
                                        </defs>
                                    </svg>
                                </span>
                            </div>
                            <div className="py-10 px-2 lg:py-20 flex flex-col items-center w-full text-white h-[60vh] bg-[#251f59]">
                                <div className="text-base md:text-xl lg:text-4xl">
                                    <p>
                                        Are you ready for the <span className="gold-text">Challenge</span>?
                                    </p>
                                    <p>grab a friend or mate.</p>
                                    <p className="text-[14px] mdl:text-xl gold-text">This is going to be good</p>
                                </div>
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className={`${style["letsgobtn"]} text-base md:text-xl lg:text-3xl border border-[#b133db]`}>
                                    <span>LET'S GO</span>
                                </button>
                            </div>

                            <div className="bg-gradient-to-t to-[#57198a] from-[#b133db] border border-[#b133db] h-10 w-full rounded-b-3xl"></div>
                        </motion.div>
                    </div>
                );

            case 2:
                return (
                    <StepperHeader
                        step={step}
                        setStep={setStep}>
                        <motion.div
                            initial={{ opacity: 0, x: -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            key="step2"
                            // className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
                        >
                            <div className="md:container mx-auto flex justify-between items-center w-screen px-10 pb-10 gap-10">
                                <div
                                    style={{ marginTop: "100px" }}
                                    className="flex bg-[#251F59] flex-col items-center justify-between border border-[#fff] text-center
               overflow-hidden w-full h-[30rem] px-0 py-5 rounded-3xl lg:mt-10">
                                    <h1
                                        style={{ color: "#fff" }}
                                        className="main-text text-2xl lg:text-[40px] my-2">
                                        Choose a category
                                    </h1>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 lg:gap-4 h-[60%] w-full py-1 lg:py-5 px-2 lg:px-5 relative max-w-3xl">
                                        {uniqBy(challengesArray, (i) => i.title).map((category, index) => (
                                            <motion.button
                                                key={index}
                                                className={`p-2 lg:p-6 rounded-md lg:text-xl text-base flex items-center justify-center 
                  hover:scale-110 transition ease-in-out duration-300 hover:brightness-125 cursor-pointer relative ${
                      !hasAccessToVideoChallengeCategory(level >= CHALLENGE_MAX_LEVEL ? CHALLENGE_MAX_LEVEL : level, category.title) ? "bg-[#7470BA] red-text disabled" : "bg-[#7470BA] text-[#fff]"
                  }  ${!hasAccessToVideoChallengeCategory(level >= CHALLENGE_MAX_LEVEL ? CHALLENGE_MAX_LEVEL : level, category.title) ? "bg-[#000]" : "bg-gray-200"} `}
                                                onClick={() => handleCategorySelect(category.title)}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: category?.disabled ? 0.5 : 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.7 }}
                                                disabled={category?.disabled}>
                                                {/* {!hasAccessToVideoChallengeCategory(
                        level >= CHALLENGE_MAX_LEVEL
                          ? CHALLENGE_MAX_LEVEL
                          : level,
                        category.title
                      ) ? (
                        <div className="absolute w-full h-full flex justify-center items-center text-center top-2 left-2">
                          <FaLock className="w-8 h-8 lg:w-12 lg:h-12 blue-text opacity-50" />
                        </div>
                      ) : null} */}
                                                <div className="flex items-center gap-2 text-[#fff]">
                                                    <span>{category.title}</span> {selectedCategory === category.title && <span>{rightIcon}</span>}
                                                    {category?.disabled && <span>{lockIcon}</span>}
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className={`${style["continueBtn"]} font-bold mt-0 md:mt-4 gap-2 border px-20 py-4 mx-auto flex justify-center items-center rounded-full text-[#fff] border-[#fff] transition-transform duration-300 ease-in-out transform hover:scale-110`}>
                                        <span>Continue</span>
                                        <span>
                                            <svg
                                                width="10"
                                                height="9"
                                                viewBox="0 0 13 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1.5 11L11.5 1M11.5 1H2.5M11.5 1V10"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="hidden md:block relative">
                                    <Image
                                        src={challengeArray.find((i) => i.title === selectedCategory).image}
                                        alt="Boxes"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-[40rem] object-contain"
                                    />
                                    <h1 className="text-[#fff] font-bold clear-left absolute bottom-10 text-lg left-0">
                                        You can not access this category. You need to be on level 5 to unlock this category
                                    </h1>
                                    <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                        <svg
                                            width="134"
                                            height="168"
                                            viewBox="0 0 134 168"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M108.667 59V42.3333C108.667 19 90.334 0.666626 67.0007 0.666626C43.6673 0.666626 25.334 19 25.334 42.3333V59C11.1673 59 0.333984 69.8333 0.333984 84V142.333C0.333984 156.5 11.1673 167.333 25.334 167.333H108.667C122.834 167.333 133.667 156.5 133.667 142.333V84C133.667 69.8333 122.834 59 108.667 59ZM42.0007 42.3333C42.0007 28.1666 52.834 17.3333 67.0007 17.3333C81.1673 17.3333 92.0007 28.1666 92.0007 42.3333V59H42.0007V42.3333ZM76.1673 113.167L75.334 114V125.667C75.334 130.667 72.0007 134 67.0007 134C62.0007 134 58.6673 130.667 58.6673 125.667V114C53.6673 109 52.834 101.5 57.834 96.5C62.834 91.5 70.334 90.6666 75.334 95.6666C80.334 99.8333 81.1673 108.167 76.1673 113.167Z"
                                                fill="#F1DA60"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </StepperHeader>
                );

            case 3:
                return (
                    <StepperHeader
                        // addChallenge={addChallenge}
                        // setAddChallenge={setAddChallenge}
                        step={step}
                        setStep={setStep}>
                        <motion.div
                            initial={{ opacity: 0, x: -500 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            key="step3"
                            // className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
                        >
                            <div className="md:container mx-auto flex justify-between items-center w-full px-5 lg:px-10 mt-10 gap-10">
                                <div
                                    className="flex flex-col items-center justify-center text-[#fff] border border-[#fff] text-center bg-[#251F59]
                overflow-hidden w-full min-w-[20rem] lg:min-w-[35rem] h-[30rem] lg:h-[35rem] px-0 rounded-3xl mt-2 lg:mt-14">
                                    <h1
                                        style={{ color: "#fff" }}
                                        className="main-text text-2xl lg:text-[40px] mb-2">
                                        {selectedCategory} Options
                                    </h1>
                                    <div
                                        className={`grid ${
                                            selectedCategory === "Beginner" ||
                                            selectedCategory === "Dare" ||
                                            selectedCategory === "Family" ||
                                            selectedCategory === "Health" ||
                                            selectedCategory === "Adventure"
                                                ? "grid-cols-2"
                                                : "grid-cols-3"
                                        } gap-2 lg:gap-4 h-[60%] w-full p-2 lg:py-10 lg:px-5`}>
                                        {challengeArray
                                            .find((category) => category.title === selectedCategory)
                                            .options.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    className={`p-2 lg:p-4 text-center bg-gray-200 rounded-md lg:text-xl text-base
                        hover:scale-110 transition ease-in-out duration-300 hover:brightness-125 cursor-pointer bg-[#7470BA] text-[#fff] h-14 flex items-center justify-center gap-2`}
                                                    onClick={() => handleOptionSelect(option)}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.3 }}>
                                                    <span>{option.name} </span> {selectedChoice === option.name && <span>{rightIcon}</span>}
                                                </motion.button>
                                            ))}
                                    </div>
                                    <div className="-mt-1  cursor-pointer z-[9999]">
                                        <button
                                            onClick={() => {
                                                // if (!selectedChoice) return;
                                                setStep(step + 1);
                                            }}
                                            className={`${style["continueBtn"]} font-bold mt-4 gap-2 border px-20 py-4 mx-auto flex justify-center items-center rounded-full text-[#fff] border-[#fff]`}>
                                            <span>Continue</span>
                                            <span>
                                                <svg
                                                    width="10"
                                                    height="9"
                                                    viewBox="0 0 13 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1.5 11L11.5 1M11.5 1H2.5M11.5 1V10"
                                                        stroke="white"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <Image
                                        src={challengeArray.find((i) => i.title === selectedCategory).image}
                                        alt="Boxes"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-[40rem] object-contain min-w-[20rem] max-w-[25rem]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </StepperHeader>
                );

            case 4:
                return (
                    <StepperHeader
                        // addChallenge={addChallenge}
                        // setAddChallenge={setAddChallenge}
                        step={step}
                        setStep={setStep}>
                        <motion.div
                            initial={{ opacity: 0, y: -300, x: 10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                            // className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
                            key="step4">
                            <div className="md:container mx-auto flex justify-between items-center w-screen px-2 lg:px-10 pb-10 gap-10">
                                <div className="p-2 flex flex-col border border-[#fff] bg-[#251F59] overflow-hidden w-full min-w-[20rem] lg:min-w-[35rem] h-[28rem] lg:w-[35rem] px-0 rounded-xl mt-7 relative">
                                    <div className="p-4">
                                        <h1
                                            style={{ color: "#fff" }}
                                            className="main-text text-2xl lg:text-[40px] mb-2">
                                            {selectedCategory} Rules
                                        </h1>
                                        <p className="text-[#fff] text-lg md:text-3xl my-6">To start your challenge, you have to</p>
                                        <div className="flex gap-2 w-full text-[#fff] text-lg md:text-2xl">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-xs">1</span> <span> Create or add a video</span>
                                        </div>
                                        <div className="flex gap-2 w-full text-[#fff] text-lg md:text-2xl my-4">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-xs">2</span> <span>Invite Friends to vote for you</span>
                                        </div>
                                        <div className="flex gap-2 w-full text-[#fff] text-lg md:text-2xl">
                                            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-xs">3</span>{" "}
                                            <span className="flex text-start">Share challenge link to get more participants</span>
                                        </div>
                                        {/* <Select
                        className="w-full p-2"
                        classNamePrefix="select"
                        defaultValue={selectOptionHandler([selectedSelection[0]])}
                        name="color"
                        options={selectOptionHandler(selectedSelection)}
                        onChange={(e) => {
                          handleSelectionChange(e.value);
                        }}
                      /> */}

                                        {/* <ul className="mt-2">{renderRules()}</ul> */}

                                        <div className="absolute bottom-10 left-0 w-full flex items-center justify-center z-[9999]">
                                            <button
                                                onClick={() => {
                                                    setStep(5);
                                                }}
                                                className={`${style["continueBtn"]} font-bold mt-4 gap-2 border px-20 py-4 mx-auto flex justify-center items-center rounded-full text-[#fff] border-[#fff]`}>
                                                <span>Let's Start</span>
                                                <span>
                                                    <svg
                                                        width="17"
                                                        height="24"
                                                        viewBox="0 0 17 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.3768 0.10193C13.5236 0.187038 13.6372 0.319415 13.6991 0.477437C13.7609 0.635458 13.7673 0.809782 13.7173 0.97193L11.0158 9.74993H16.0003C16.1468 9.74987 16.2901 9.79271 16.4125 9.87316C16.5349 9.9536 16.6311 10.0681 16.6892 10.2026C16.7472 10.3371 16.7646 10.4856 16.7393 10.6299C16.7139 10.7742 16.6468 10.9078 16.5463 11.0144L4.5463 23.7644C4.43019 23.8879 4.27568 23.9684 4.10796 23.9928C3.94024 24.0172 3.76919 23.9841 3.6227 23.8989C3.47622 23.8136 3.36292 23.6813 3.30129 23.5234C3.23965 23.3655 3.23331 23.1914 3.2833 23.0294L5.9848 14.2499H1.0003C0.853817 14.25 0.710523 14.2071 0.588108 14.1267C0.465693 14.0463 0.369515 13.9317 0.311447 13.7972C0.253379 13.6628 0.235963 13.5142 0.261349 13.37C0.286735 13.2257 0.353812 13.092 0.454299 12.9854L12.4543 0.23543C12.5703 0.112129 12.7245 0.0316831 12.892 0.00717301C13.0595 -0.0173371 13.2304 0.01553 13.3768 0.10043V0.10193Z"
                                                            fill="#F1DA60"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                            {/* {currentPage < totalPages ? (
                          <button
                            onClick={() => setStep(step + 1)}
                            className="flex bg-[#11032e] text-white cursor-pointer items-center justify-center select-none relative shadow-[inset_0_0_20px_#ffffff8a,0_5px_#fff] w-[7.8666666667rem] h-[7.8666666667rem] hover:scale-90 duration-300 will-change-transform rounded-[50%] border-[0.5333333333rem] border-solid border-white"
                          >
                            <span className="tracking-wider rotate-[-4deg] text-[1.5333333333rem] z-[9999]">
                              Next
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={handleStart}
                            className="flex bg-[#11032e] text-white cursor-pointer items-center justify-center select-none relative shadow-[inset_0_0_20px_#ffffff8a,0_5px_#fff] w-[7.8666666667rem] h-[7.8666666667rem] hover:scale-90 duration-300 will-change-transform rounded-[50%] border-[0.5333333333rem] border-solid border-white"
                          >
                            <span className="tracking-wider rotate-[-4deg] text-[1.5333333333rem] z-[9999]">
                              START
                            </span>
                          </button>
                        )} */}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <Image
                                        src={"/assets/img/rules.png"}
                                        alt="Boxes"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-[40rem] object-contain min-w-[20rem] max-w-[25rem]"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </StepperHeader>
                );

            case 5:
                return (
                    <StepperHeader
                        // addChallenge={addChallenge}
                        // setAddChallenge={setAddChallenge}
                        step={step}
                        setStep={setStep}>
                        <motion.div
                            initial={{ opacity: 0, y: -300, x: 10 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                            className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
                            key="step5">
                            <div
                                className="p-4 flex flex-col items-center justify-center border border-[#fff] text-center bg-[#251F59]
                overflow-hidden max-w-[35rem] min-w-[23rem] lg:min-w-[35rem] lg:h-[32rem] xs:h-[25rem]  px-0 rounded-3xl mt-7 relative">
                                <div className="-mt-5">
                                    <h3 className="main-text lg:text-[45px] xs:text-[30px] sm:text-[40px] mb-3 xs:px-2">Let's Start the Challenge</h3>
                                    <div className="flex-col text-[#fff]">
                                        <button
                                            onClick={() => {}}
                                            className="my-5 lg:my-10 w-full border border-[#F1DA60] rounded-full p-5 font-bold flex items-center justify-center gap-6">
                                            <span>
                                                <svg
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 26 26"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.6667 11L18.2627 10.1347C18.7367 9.97666 18.9737 9.89765 19.1624 9.94502C19.3275 9.98649 19.4705 10.0896 19.5621 10.2331C19.6667 10.3971 19.6667 10.6469 19.6667 11.1466V14.8534C19.6667 15.3531 19.6667 15.6029 19.5621 15.7669C19.4705 15.9104 19.3275 16.0135 19.1624 16.055C18.9737 16.1023 18.7367 16.0233 18.2627 15.8653L15.6667 15M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13ZM8.46667 17.6667H13.5333C14.2801 17.6667 14.6534 17.6667 14.9387 17.5213C15.1895 17.3935 15.3935 17.1895 15.5213 16.9387C15.6667 16.6534 15.6667 16.2801 15.6667 15.5333V10.4667C15.6667 9.71993 15.6667 9.34656 15.5213 9.06135C15.3935 8.81046 15.1895 8.60649 14.9387 8.47866C14.6534 8.33333 14.2801 8.33333 13.5333 8.33333H8.46667C7.71993 8.33333 7.34656 8.33333 7.06135 8.47866C6.81046 8.60649 6.60649 8.81046 6.47866 9.06135C6.33333 9.34656 6.33333 9.71993 6.33333 10.4667V15.5333C6.33333 16.2801 6.33333 16.6534 6.47866 16.9387C6.60649 17.1895 6.81046 17.3935 7.06135 17.5213C7.34656 17.6667 7.71993 17.6667 8.46667 17.6667Z"
                                                        stroke="white"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span>Record Live</span>
                                        </button>
                                        <button
                                            onClick={() => {}}
                                            className="my-5 lg:my-10 w-full border border-[#F1DA60] rounded-full p-5 font-bold flex items-center justify-center gap-6">
                                            <span>
                                                <svg
                                                    width="26"
                                                    height="24"
                                                    viewBox="0 0 26 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2.33248 5.33325H23.6658M3.66581 1.33325H22.3325M6.19376 22.6666H19.8045C21.1686 22.6666 21.8507 22.6666 22.3916 22.4111C22.868 22.186 23.267 21.8249 23.5384 21.3732C23.8464 20.8605 23.9143 20.1818 24.05 18.8245L24.6473 12.8517C24.7692 11.6325 24.8302 11.0229 24.6301 10.5517C24.4544 10.1378 24.1444 9.7952 23.75 9.57918C23.3011 9.33325 22.6884 9.33325 21.4632 9.33325H4.5351C3.30985 9.33325 2.69722 9.33325 2.24827 9.57918C1.85391 9.7952 1.54385 10.1378 1.36814 10.5517C1.16811 11.0229 1.22907 11.6325 1.35099 12.8517L1.94827 18.8245C2.084 20.1818 2.15187 20.8605 2.45994 21.3732C2.73128 21.8249 3.13032 22.186 3.60671 22.4111C4.14758 22.6666 4.82964 22.6666 6.19376 22.6666ZM16.9991 15.9999C16.9991 17.4727 15.2083 18.6666 12.9991 18.6666C10.79 18.6666 8.99914 17.4727 8.99914 15.9999C8.99914 14.5272 10.79 13.3333 12.9991 13.3333C15.2083 13.3333 16.9991 14.5272 16.9991 15.9999Z"
                                                        stroke="white"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span>From Collection</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setStep(8);
                                            }}
                                            className="my-5 lg:my-10 w-full border border-[#F1DA60] rounded-full p-5 font-bold flex items-center justify-center gap-6">
                                            <span>
                                                <svg
                                                    width="22"
                                                    height="24"
                                                    viewBox="0 0 22 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M9.31652 18.1696C8.28505 18.1696 7.42462 17.3813 7.33455 16.3537C7.14622 14.2053 7.09856 12.0474 7.19171 9.89364C7.07928 9.88612 6.96686 9.87826 6.85446 9.87007L4.86839 9.72529C3.59898 9.63276 2.88938 8.21733 3.5747 7.14482C5.03628 4.85747 7.71525 2.2974 9.91985 0.713754C10.5649 0.250363 11.4338 0.250364 12.0789 0.713754C14.2835 2.2974 16.9625 4.85747 18.424 7.14482C19.1094 8.21733 18.3998 9.63276 17.1304 9.72529L15.1443 9.87006C15.0319 9.87826 14.9195 9.88612 14.807 9.89364C14.9002 12.0474 14.8525 14.2053 14.6642 16.3537C14.5741 17.3813 13.7137 18.1696 12.6822 18.1696H9.31652ZM9.24132 9.01659C9.08971 11.3996 9.11802 13.7907 9.32607 16.1696H12.6727C12.8807 13.7907 12.909 11.3996 12.7574 9.01659C12.7404 8.74943 12.8312 8.48661 13.0096 8.28695C13.1879 8.0873 13.4388 7.96747 13.7062 7.9543C14.1373 7.93306 14.5682 7.90675 14.9989 7.87536L16.4413 7.77021C15.1619 5.88582 13.5599 4.24015 11.7078 2.90968L10.9994 2.40082L10.291 2.90968C8.43884 4.24015 6.83685 5.88582 5.55745 7.77021L6.99986 7.87536C7.43051 7.90675 7.86143 7.93306 8.29255 7.9543C8.55992 7.96747 8.81085 8.0873 8.98917 8.28695C9.1675 8.48661 9.25832 8.74943 9.24132 9.01659Z"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M2.66602 18.6665C2.66602 18.1143 2.2183 17.6665 1.66602 17.6665C1.11373 17.6665 0.666016 18.1143 0.666016 18.6665V21.3332C0.666016 22.6219 1.71069 23.6665 2.99935 23.6665H18.9993C20.288 23.6665 21.3327 22.6219 21.3327 21.3332V18.6665C21.3327 18.1143 20.885 17.6665 20.3327 17.6665C19.7804 17.6665 19.3327 18.1143 19.3327 18.6665V21.3332C19.3327 21.5173 19.1834 21.6665 18.9993 21.6665H2.99935C2.81525 21.6665 2.66602 21.5173 2.66602 21.3332V18.6665Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </span>
                                            <span>Upload Video</span>
                                        </button>
                                    </div>
                                    {/* <div className="border-2 border-[#fff] curspor-pointer border-dashed w-full h-40  mx-5 -ml-2 text-center flex flex-col 
           justify-center items-center transition-colors ease-in-out duration-500 hover:bg-[#6eff3e] hover:border-[#000] hover:text-[#000]">

                <input type="file" className="w-full h-full opacity-0 cursor-pointer absolute left-0 right-0 top-0 bottom-0" />
                 <FaCloudUploadAlt className="w-20 h-20 blue-text text-center" />
                 <p className="text-xl main-text uppercase hover:text-[#000]">Upload your video</p>

           </div> */}
                                </div>
                            </div>
                        </motion.div>
                    </StepperHeader>
                );
            //   case 7:
            //     return (
            //       <motion.div
            //         initial={{ opacity: 0, y: -300, x: 10 }}
            //         animate={{ opacity: 1, y: 0, x: 0 }}
            //         exit={{ opacity: 0, x: -500 }}
            //         transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            //         className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
            //         key="step7"
            //       >
            //         <div
            //           className={`flex flex-col items-center justify-center text-[#895cea] text-center ${styles.challengeCardBg}
            //           overflow-hidden max-w-[35rem] min-w-[23rem] lg:min-w-[35rem] h-[35rem]  px-3 rounded-[3rem] mt-7 relative`}
            //         >
            //           <div className="-mt-5">
            //             <h3 className="main-text lg:text-[45px] xs:text-[35px] mb-3 -mt-10">
            //               Upload from Collection
            //             </h3>
            //             <div className="flex-col">
            //               <VideoCollection
            //                 setSelectedCollectionVideo={setSelectedCollectionVideo}
            //                 selectedCollectionVidoe={selectedCollectionVidoe}
            //               />
            //             </div>
            //             <div className="mt-2 flex justify-around cursor-pointer z-[9999] ">
            //               <button
            //                 onClick={() => setStep(5)}
            //                 className="flex  bg-[#895cea]  text-white cursor-pointer items-center justify-center select-none relative shadow-[inset_0_0_20px_#ffffff8a,0_5px_#fff] w-[6.8666666667rem] h-[6.8666666667rem] hover:scale-90 duration-300 will-change-transform rounded-[50%] border-[0.5333333333rem] border-solid border-white"
            //               >
            //                 <span className="tracking-wider rotate-[-4deg]  text-[1.5333333333rem] z-[9999]">
            //                   Go Back
            //                 </span>
            //               </button>

            //               {selectedCollectionVidoe && (
            //                 <button
            //                   onClick={() => setStep(9)}
            //                   className="flex  bg-[#895cea]  text-white cursor-pointer items-center justify-center select-none relative shadow-[inset_0_0_20px_#ffffff8a,0_5px_#fff] w-[6.8666666667rem] h-[6.8666666667rem] hover:scale-90 duration-300 will-change-transform rounded-[50%] border-[0.5333333333rem] border-solid border-white"
            //                 >
            //                   <span className="tracking-wider rotate-[-4deg]  text-[1.5333333333rem] z-[9999]">
            //                     NEXT
            //                   </span>
            //                 </button>
            //               )}
            //             </div>
            //             {/* <div className="border-2 border-[#fff] curspor-pointer border-dashed w-full h-40  mx-5 -ml-2 text-center flex flex-col
            //      justify-center items-center transition-colors ease-in-out duration-500 hover:bg-[#6eff3e] hover:border-[#000] hover:text-[#000]">

            //           <input type="file" className="w-full h-full opacity-0 cursor-pointer absolute left-0 right-0 top-0 bottom-0" />
            //            <FaCloudUploadAlt className="w-20 h-20 blue-text text-center" />
            //            <p className="text-xl main-text uppercase hover:text-[#000]">Upload your video</p>

            //      </div> */}
            //           </div>
            //         </div>
            //       </motion.div>
            //     );

            case 8:
                return (
                    <StepperHeader
                        // addChallenge={addChallenge}
                        // setAddChallenge={setAddChallenge}
                        step={step}
                        setStep={setStep}>
                        <motion.div
                            initial={{ opacity: 0, x: -300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -500 }}
                            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                            className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
                            key="step7">
                            <div
                                className="flex flex-col border border-[#fff] text-center bg-[#251F59] 
                overflow-hidden max-w-[35rem] min-w-[23rem] lg:min-w-[35rem] h-[32rem]  px-0 rounded-3xl mt-7 relative">
                                <div className="p-4">
                                    <h3
                                        style={{ color: "#fff" }}
                                        className="main-text text-2xl lg:text-[40px] my-4">
                                        Upload a Video
                                    </h3>
                                    <div className="flex-col w-full px-4 gap-4">
                                        <div className="flex-col space-y-5 text-[#fff] w-full">
                                            <div>
                                                <label className="flex text-xs">Video Name</label>
                                                <input
                                                    placeholder="E.g."
                                                    className="bg-[#fff]/10 rounded-full w-full p-4 block text-base"
                                                    // value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="flex text-xs">Description </label>
                                                <textarea
                                                    placeholder="Talk about challenge"
                                                    className="bg-[#fff]/10 rounded-2xl w-full p-3 block text-base"
                                                    rows={3}
                                                    // value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            {false ? (
                                                <div className="relative w-full mx-1 h-[6rem]">
                                                    <video
                                                        onClick={playToggle}
                                                        src={videoUrl}
                                                        ref={videoRef}
                                                        className="bg-gray-100 border-2 object-cover border-dashed flex flex-col h-[6rem] items-center justify-center relative w-full rounded-lg dark:bg-gray-800 dark:border-gray-600"
                                                    />
                                                    {!play && (
                                                        <div
                                                            onClick={playToggle}
                                                            className="  cursor-pointer absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                                                            id="play">
                                                            <svg
                                                                version="1.1"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                x="0px"
                                                                y="0px"
                                                                height="50px"
                                                                width="50px"
                                                                viewBox="0 0 100 100"
                                                                enableBackground="new 0 0 100 100"
                                                                xmlSpace="preserve">
                                                                <path
                                                                    className="stroke-solid"
                                                                    fill="none"
                                                                    stroke="white"
                                                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
      C97.3,23.7,75.7,2.3,49.9,2.5"
                                                                />
                                                                <path
                                                                    className="stroke-dotted"
                                                                    fill="none"
                                                                    stroke="white"
                                                                    d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
      C97.3,23.7,75.7,2.3,49.9,2.5"
                                                                />
                                                                <path
                                                                    className="icon"
                                                                    fill="white"
                                                                    d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor="video"
                                                    className="bg-[#fff]/10 p-6 text-[#fff] border-2 border-dashed flex gap-4 items-center justify-center relative w-full 
                  rounded-lg border-[#F1DA60] cursor-pointer font-bold">
                                                    <span>
                                                        <svg
                                                            width="22"
                                                            height="24"
                                                            viewBox="0 0 22 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M9.31652 18.1696C8.28505 18.1696 7.42462 17.3813 7.33455 16.3537C7.14622 14.2053 7.09856 12.0474 7.19171 9.89364C7.07928 9.88612 6.96686 9.87826 6.85446 9.87007L4.86839 9.72529C3.59898 9.63276 2.88938 8.21733 3.5747 7.14482C5.03628 4.85747 7.71525 2.2974 9.91985 0.713754C10.5649 0.250363 11.4338 0.250364 12.0789 0.713754C14.2835 2.2974 16.9625 4.85747 18.424 7.14482C19.1094 8.21733 18.3998 9.63276 17.1304 9.72529L15.1443 9.87006C15.0319 9.87826 14.9195 9.88612 14.807 9.89364C14.9002 12.0474 14.8525 14.2053 14.6642 16.3537C14.5741 17.3813 13.7137 18.1696 12.6822 18.1696H9.31652ZM9.24132 9.01659C9.08971 11.3996 9.11802 13.7907 9.32607 16.1696H12.6727C12.8807 13.7907 12.909 11.3996 12.7574 9.01659C12.7404 8.74943 12.8312 8.48661 13.0096 8.28695C13.1879 8.0873 13.4388 7.96747 13.7062 7.9543C14.1373 7.93306 14.5682 7.90675 14.9989 7.87536L16.4413 7.77021C15.1619 5.88582 13.5599 4.24015 11.7078 2.90968L10.9994 2.40082L10.291 2.90968C8.43884 4.24015 6.83685 5.88582 5.55745 7.77021L6.99986 7.87536C7.43051 7.90675 7.86143 7.93306 8.29255 7.9543C8.55992 7.96747 8.81085 8.0873 8.98917 8.28695C9.1675 8.48661 9.25832 8.74943 9.24132 9.01659Z"
                                                                fill="white"
                                                            />
                                                            <path
                                                                d="M2.66602 18.6665C2.66602 18.1143 2.2183 17.6665 1.66602 17.6665C1.11373 17.6665 0.666016 18.1143 0.666016 18.6665V21.3332C0.666016 22.6219 1.71069 23.6665 2.99935 23.6665H18.9993C20.288 23.6665 21.3327 22.6219 21.3327 21.3332V18.6665C21.3327 18.1143 20.885 17.6665 20.3327 17.6665C19.7804 17.6665 19.3327 18.1143 19.3327 18.6665V21.3332C19.3327 21.5173 19.1834 21.6665 18.9993 21.6665H2.99935C2.81525 21.6665 2.66602 21.5173 2.66602 21.3332V18.6665Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <span>Upload a Video</span>
                                                </label>
                                            )}

                                            <input
                                                id="video"
                                                className="hidden cursor-pointer"
                                                type="file"
                                                // onChange={(e) => handleSelectVideo(e)}
                                                onClick={(e) => (e.target.value = null)}
                                                accept="video/mp4,video/x-m4v,video/*"
                                            />
                                            {/* <p className="my-3 leading-6 main-text">
                          {" "}
                          Video should be no longer than 2 minutes. <br /> please
                          upload here ..
                        </p> */}
                                        </div>
                                        {/* )} */}
                                        {/* <VideoCollection
                      setSelectedCollectionVideo={setSelectedCollectionVideo}
                    /> */}
                                        <div className="mt-2 flex justify-around cursor-pointer z-[9999] ">
                                            <button
                                                onClick={() => {
                                                    // if (!title || !description || !videoFile) return;
                                                    setStep(step + 1);
                                                }}
                                                // disabled={!videoFile}
                                                className={`${style["continueBtn"]} font-bold mt-4 gap-2 border px-20 py-4 mx-auto flex justify-center items-center rounded-full text-[#fff] border-[#fff]`}>
                                                <span>Review Challenge</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </StepperHeader>
                );

            //   case 9:
            //     return (
            //       <StepperHeader
            //         addChallenge={addChallenge}
            //         setAddChallenge={setAddChallenge}
            //         step={step}
            //         setStep={setStep}
            //       >
            //         <motion.div
            //           initial={{ opacity: 0, y: -300, x: 10 }}
            //           animate={{ opacity: 1, y: 0, x: 0 }}
            //           exit={{ opacity: 0, x: -500 }}
            //           transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            //           className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden"
            //           key="step8"
            //         >
            //           <div
            //             className="flex  flex-col items-center justify-center text-[#fff] border border-[#fff] text-center bg-[#251F59]
            //           overflow-hidden max-w-[35rem] min-w-[23rem] lg:min-w-[35rem] h-[35rem]  px-10 rounded-3xl mt-14 relative "
            //           >
            //             <div className="uk-flex uk-flex-column choose-upload w-full relative">
            //               {selectedCollectionVidoe?.videoUrl ||
            //                 videoFile ||
            //                 recordedVideo ? (
            //                 <video
            //                   src={
            //                     selectedCollectionVidoe?.videoUrl ||
            //                     videoUrl ||
            //                     recordedVideo
            //                   }
            //                   autoPlay
            //                   className="bg-gray-100 border-2 object-cover border-dashed flex flex-col h-24 items-center justify-center relative w-full rounded-lg dark:bg-gray-800 dark:border-gray-600"
            //                 />
            //               ) : (
            //                 <div className="mx-auto flex flex-col h-40 items-center justify-center relative w-full rounded-lg border-2 border-dashed mt-3">
            //                   <svg
            //                     xmlns="http://www.w3.org/2000/svg"
            //                     viewBox="0 0 20 20"
            //                     fill="currentColor"
            //                     className="w-12"
            //                   >
            //                     <path
            //                       fillRule="evenodd"
            //                       d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
            //                       clipRule="evenodd"
            //                     />
            //                   </svg>
            //                 </div>
            //               )}
            //               {selectedCollectionVidoe?.thumbnail ? (
            //                 <div
            //                   className={`relative w-24 flex-1 h-[54px] bg-[green] rounded-lg border-4 border-[red]}  `}
            //                 >
            //                   <Image
            //                     className="w-24  rounded-lg flex object-cover cursor-pointer hover:brightness-125"
            //                     src={selectedCollectionVidoe?.thumbnailUrl}
            //                     alt="img"
            //                     fill
            //                   />
            //                 </div>
            //               ) : thumbnailList && thumbnailList.length > 0 ? (
            //                 <div className=" m-2 rounded-lg grid grid-flow-row grid-cols-4 gap-1 p-2">
            //                   {thumbnailList &&
            //                     thumbnailList.length > 0 &&
            //                     thumbnailList.map((item, index) => (
            //                       <div
            //                         key={index}
            //                         onClick={() => setSelectedThumbnail(index)}
            //                         className={`relative flex-1 h-[54px] bg-[green]   rounded-lg ${selectedThumbnail === index &&
            //                           "border-4 border-[red]"
            //                           }  `}
            //                       >
            //                         <Image
            //                           className="  rounded-lg flex object-cover cursor-pointer hover:brightness-125"
            //                           src={item}
            //                           alt="img"
            //                           fill
            //                         />
            //                       </div>
            //                     ))}
            //                 </div>
            //               ) : (
            //                 <p className="text-[white] text-center pb-4">
            //                   {videoFile || (recordedVideo && "Loading Thumbnails..")}
            //                 </p>
            //               )}

            //               <div>
            //                 <input
            //                   type="text"
            //                   style={{
            //                     background: "rgba(255,255,255,0.1)",
            //                     borderRadius: "16px",
            //                     color: "#fff",
            //                     padding: "12px",
            //                     border: "none",
            //                   }}
            //                   className="bg-[#fff]/10 rounded-2xl w-full p-3 block text-base text-black mb-5"
            //                   value={title}
            //                   onChange={(e) => setTitle(e.target.value)}
            //                   placeholder="Challenge title"
            //                 />

            //                 <textarea
            //                   className="bg-[#fff]/10 rounded-2xl w-full p-3 block text-base text-black"
            //                   style={{
            //                     background: "rgba(255,255,255,0.1)",
            //                     borderRadius: "16px",
            //                     color: "#fff",
            //                     padding: "12px",
            //                   }}
            //                   value={description}
            //                   onChange={(e) => setDescription(e.target.value)}
            //                   placeholder="Description"
            //                 />

            //                 <button
            //                   disabled={loading}
            //                   onClick={handleSubmit}
            //                   className={`${style["continueBtn"]} font-bold mt-4 gap-2 border px-20 py-4 mx-auto flex justify-center items-center rounded-full text-[#fff] border-[#fff]`}
            //                 >
            //                   <span className="ml-3">
            //                     {loading ? "Loading..." : "Submit Challenge"}{" "}
            //                   </span>
            //                 </button>
            //               </div>
            //             </div>
            //           </div>
            //         </motion.div>
            //       </StepperHeader>
            //     );

            default:
                return null;
        }
    };
    return <AnimatePresence>{renderStepContent()}</AnimatePresence>;
};

export default SliderModal;
