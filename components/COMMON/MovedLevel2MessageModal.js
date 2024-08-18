"use client";
import React, { useEffect, useState } from "react";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import { useUserStore } from "../../state/useUserStore";
import useWindowDimensions from "../../hooks/useWindowSize";
import Confetti from "react-confetti";
export default function MovedLevel2MessageModal() {
    const { height, width } = useWindowDimensions();
    const [isMovedLevel2Message, setIsMovedLevel2Message] = useState(false);
    const { user } = useUserStore();

    useEffect(() => {
        if (user?.congratulations && user?.level === 2) {
            setIsMovedLevel2Message(true);
        }
    }, [user]);

    if (!user) return null;
    if (!isMovedLevel2Message) return null;

    return (
        <div
            id="myModal"
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isMovedLevel2Message ? "flex" : "hidden"}`}>
            <div className="modal-overlay absolute inset-0 overflow-hidden bg-black opacity-50"></div>

            <div className="modal-container overflow-hidden bg-gray-800 w-[50rem] px-9 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                    onClick={() => setIsMovedLevel2Message(false)}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="flex flex-col items-center justify-center w-full h-full mt-4 z-50">
                    <div className="flex items-center justify-center space-x-2 w-full text-center">
                        <div className="flex flex-row">
                            <Image
                                src={logo}
                                width={35}
                                height={35}
                                alt="logo"
                                className="w-7 h-7 rounded-full object-cover"
                            />
                            <h1 className="white-text text-xl font-semibold">Bragtime</h1>
                        </div>
                    </div>

                    {/* Congratulations heading */}
                    <h2 className="text-white text-3xl font-semibold mt-8 mb-4">Congratulations!</h2>

                    {/* Success message */}
                    <p className="text-white text-lg font-medium mb-8">You have successfully moved to level 2</p>

                    {/* Action buttons */}
                    <div className="flex justify-center space-x-4 mb-4">
                        <button
                            onClick={() => {
                                setIsMovedLevel2Message(false);
                            }}
                            className="btn-blue px-6 py-3 rounded-xl text-white text-lg font-semibold hover:brightness-110 transition duration-300">
                            Continue level 2
                        </button>
                        <button
                            onClick={() => {
                                setIsMovedLevel2Message(false);
                            }}
                            className="btn-purp px-6 py-3 rounded-xl text-white text-lg font-semibold hover:brightness-110 transition duration-300">
                            Hold BRGs and Move to Level 3
                        </button>
                    </div>
                </div>
            </div>
            <Confetti
                width={width}
                height={height}
            />
        </div>
    );
}
