"use client";
import dynamic from "next/dynamic";
import { useUserStore } from "../../../../state/useUserStore";
const Banner = dynamic(() => import("./banner"));
const ProfileDetail = dynamic(() => import("./profileDetail"));

export default function UserDetails() {
    const { user } = useUserStore();
    return (
        <div className="">
            <Banner />
            <ProfileDetail />
        </div>
    );
}
