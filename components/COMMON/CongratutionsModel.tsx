"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "../../state/useUserStore";
import Confetti from "react-confetti";
import useWindowDimensions from "../../hooks/useWindowSize";

export default function Congratulation() {
    const { height, width } = useWindowDimensions();
    const { user } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (user?.congratulations && user?.level === 1) {
            setIsOpen(true);
        }
        setTimeout(() => {
            setIsOpen(false);
        }, 7000);
    }, [user]);

    return (
        <div
            id="myModal"
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isOpen ? "flex" : "hidden"}`}>
            <div className="modal-overlay absolute inset-0  overflow-hidden bg-black opacity-50" />
            <div className="modal-container overflow-hidden pb-4 bg-gray-800 w-[50rem] px-9 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <button
                    className="absolute top-8 right-10 text-white hover:text-gray-300 focus:outline-none"
                    onClick={() => setIsOpen(false)}>
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
                <div className={`flex flex-col items-center text-center mdl:px-44 w-full h-full mt-4 z-50`}>
                    <div className="space-y-8 w-full text-center text-white">
                        <h1 className="font-bold text-3xl">Congratutions</h1>
                        <p>Congratulations, you have been promoted to level {user?.level}, Start exploring features in this level </p>
                        <button className="rounded-full px-20 py-4 font-bold bg-primary">Let's Go</button>
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
