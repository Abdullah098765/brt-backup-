"use client";
import RegesterUser from "../../components/AUTH/RegesterUser";
import React from "react";
import Loader from "../../components/Loader";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function page() {
    const [currentUser, loading] = useAuthState(auth);
    return (
        <div>
            <RegesterUser />
            {loading && <Loader loading={loading} />}
        </div>
    );
}
