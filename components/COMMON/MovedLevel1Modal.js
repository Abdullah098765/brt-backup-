"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
import metamaskLogo from "../../../public/images/auth/metamask.svg";
import logo from "../../../public/assets/logo.png";
import { auth } from "../../../firebaseConfig";
import { metamaskWallet, useAddress, useConnect } from "@thirdweb-dev/react";
import { useUserStore } from "../../state/useUserStore";

const variants = {
    hidden: { opacity: 0, x: "75px" },
    visible: { opacity: 1, x: 0 },
};

export default function MovedLevel1Modal() {
    const [isMovedLevel1ModalOpen, setIsMovedLevel1ModalOpen] = useState(false);
    const { user, updateUserWallet, fetchUserData } = useUserStore();
    const connect = useConnect();
    const metamask = metamaskWallet();
    const address = useAddress();
    const [isMetamaskProcessing, setIsMetamaskProcessing] = useState(false);

    useEffect(() => {
        if (auth.currentUser && !user) {
            fetchUserData();
        }
    }, [user, auth]);

    useEffect(() => {
        if (address) updateUserWallet(address);
    }, [address]);

    // const [paymentData, setPaymentData] = useState({
    //     cardNumber: "",
    //     expiry: "",
    //     cvc: "",
    //     cardHolderName: "",
    // });

    // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    // const [isProcessing, setIsProcessing] = useState(false);
    // const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //     const isInputValid = !!paymentData.cardNumber.trim() && !!paymentData.expiry.trim() && !!paymentData.cvc.trim() && !!paymentData.cardHolderName.trim();
    //     setIsButtonDisabled(!isInputValid || isError);
    // }, [paymentData, isError]);

    // const handleInputChange = (e) => {
    //     setIsError(false);
    //     const { name, value } = e.target;
    //     setPaymentData({
    //         ...paymentData,
    //         [name]: value,
    //     });
    // };

    // const handleAddPaymentCard = async () => {
    //     setIsProcessing(true);
    //     try {
    //         const response = await fetch("/api/add_card", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ creditCard: paymentData, email: auth?.currentUser?.email }),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log("Form data submitted:", data);
    //             setIsProcessing(false);
    //             window.location = origin + "/home";
    //         } else {
    //             const errorData = await response.json();
    //             console.error(errorData.error);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         setIsProcessing(false);
    //     }
    //     console.log(paymentData);
    // };

    useEffect(() => {
        const id = setTimeout(() => {
            if (!user?.walletInfo && user?.level === 1 && user?.wallet === "") {
                setIsMovedLevel1ModalOpen(true);
            } else {
                setIsMovedLevel1ModalOpen(false);
            }
        }, 9000);

        return () => clearTimeout(id);
    }, [user]);

    if (!user) return null;

    return (
        <div
            id="myModal"
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isMovedLevel1ModalOpen ? "flex" : "hidden"}`}>
            <div className="modal-overlay absolute inset-0 overflow-hidden bg-black opacity-50"></div>

            <div className="modal-container overflow-hidden bg-gray-800 w-[50rem] px-9 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                    onClick={() => setIsMovedLevel1ModalOpen(false)}>
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

                <div className="flex items-center justify-center space-x-2 w-full text-center">
                    <div className="flex flex-row mt-4 justify-center gap-2">
                        <Image
                            src={logo}
                            width={35}
                            height={35}
                            alt="logo"
                            className="w-7 h-7 rounded-full object-cover"
                        />
                        <h1 className="white-text text-2xl font-semibold">Bragtime</h1>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full mt-4 z-50">
                    <div className="flex items-center justify-center space-x-2 w-full text-center">
                        <h1 className="text-white text-2xl font-semibold mb-4">Add Payment Method to Move Next Level</h1>
                    </div>

                    <motion.div
                        id="step2"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="w-full">
                        <div className="flex flex-col text-left my-1 w-full px-3 mdl:px-0">
                            <div className="flex flex-col space-y-4 my-4 w-full px-3 mdl:px-0">
                                <button
                                    onClick={() => {
                                        setIsMetamaskProcessing(true);
                                        connect(metamask);
                                    }}
                                    className="w-full py-3 rounded-lg bg-[#484852e0] flex justify-center items-center text-center space-x-3 my-1 hover:bg-[#ffffff25]">
                                    <div className="w-6 h-6">
                                        <Image
                                            src={metamaskLogo}
                                            width={30}
                                            height={30}
                                            alt="metamaskLogo"
                                            className="object-cover"
                                        />
                                    </div>

                                    {isMetamaskProcessing ? (
                                        <h2 className="text-white text-lg text-nowrap">Processing... </h2>
                                    ) : (
                                        <h2 className="text-white text-lg text-nowrap">{address ? address : "Connect Wallet"}</h2>
                                    )}
                                </button>

                                {/* <p className="text-white text-center my-1">or</p> */}

                                {/* <button className="w-full py-3 rounded-lg bg-[#484852e0] flex justify-center items-center text-center space-x-3 my-1 hover:bg-[#ffffff25]">
                                    <FaCreditCard className="w-6 h-6 text-[#A62FCD] -ml-5" />
                                    <h2 className="text-white text-lg">Connect Card</h2>
                                </button> */}
                            </div>

                            {/* <div className="flex flex-col space-y-4 my-4 w-full px-3 mdl:px-0">
                                <div className="flex flex-col w-full ">
                                    <label className={`${true ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span>{true ? "Card Holder Name:" : "This field is required!"}</span>
                                    </label>
                                    <input
                                        id="cardHolderName"
                                        name="cardHolderName"
                                        value={paymentData.cardHolderName}
                                        onChange={handleInputChange}
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
                                                       ${true ? "border-none" : "border-[3px] border-red-600"}`}
                                        placeholder="Card Holder Name"
                                    />
                                </div>
                                <CreditCardInput
                                    cardNumberInputProps={{ name: "cardNumber", value: paymentData.cardNumber, onChange: handleInputChange, onError: () => setIsError(true) }}
                                    cardExpiryInputProps={{ name: "expiry", value: paymentData.expiry, onChange: handleInputChange, onError: () => setIsError(true) }}
                                    cardCVCInputProps={{ name: "cvc", value: paymentData.cvc, onChange: handleInputChange, onError: () => setIsError(true) }}
                                    fieldClassName="w-full h-14 flex justify-between bg-white rounded-lg text-lg"
                                />
                                <button
                                    disabled={isButtonDisabled}
                                    onClick={handleAddPaymentCard}
                                    className={` py-4 white-text rounded-lg my-1 border border-[#ccc]  px-3 mdl:px-0 ${
                                        isButtonDisabled ? "bg-[gray] cursor-not-allowed" : "btn-purp hover:brightness-125"
                                    }`}>
                                    {isProcessing ? "Processing..." : "Add Payment Mathod"}
                                </button>
                            </div> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
