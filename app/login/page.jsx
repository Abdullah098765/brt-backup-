"use client";
import React from "react";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../../components/AUTH/Login"));
const Loader = dynamic(() => import("../../components/Loader"));

export default function page() {
    const [currentUser, loading] = useAuthState(auth);
    return (
        <>
            <Login />
            {loading && <Loader loading={loading} />}
        </>
    );
}
