"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/logo.png";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function page() {
    const [currentUser, loading] = useAuthState(auth);
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen">
                <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt="google"
                    className="mb-7"
                />
                <h1 className="text-3xl font-bold mb-4 text-white">Verification Email Sent</h1>
                <p className="text-white text-center mb-8">
                    Your have successfully signed up <br />
                    We've sent a verification email to your email <strong>{currentUser?.email}</strong>
                    .
                    <br />
                    Please check your inbox and follow the instructions to verify your account.
                    <br />
                    If you don't receive the email, please check your spam folder.
                </p>
            </div>
        </div>
    );
}
