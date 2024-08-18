"use client";
import Signup from "../../components/AUTH/Signup";
import React from "react";
import Loader from "../../components/Loader";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function page() {
    const [currentUser, loading] = useAuthState(auth);
    return (
        <div>
            <Signup />
            {loading && <Loader loading={loading} />}
        </div>
    );
}
