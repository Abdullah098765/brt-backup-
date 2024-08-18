"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegCompass } from "react-icons/fa6";
import Modal from "react-modal";
import { Tooltip } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebaseConfig";
import useAuth from "../../../hooks/useAuth";
import { useUserStore } from "../../../state/useUserStore";
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineFilm,
    HiOutlineCog,
    HiOutlineCalendar,
    HiOutlineChatAlt2,
    HiOutlineCamera,
    HiOutlineCollection,
    HiOutlineLogout,
    HiOutlineChatAlt,
} from "react-icons/hi";
import Image from "next/image";
// const ConnectWalletComponent = dynamic(() => import("../ConnectWalletComponent"));

const LeftNav = ({ handleRoutes }) => {
    const { user } = useUserStore();
    const { handleLogout } = useAuth();
    const router = useRouter();
    const currentRoute = router.pathname;
    const [metaModal, setMetaModal] = useState(false);

    return (
        <div className="hidden lg:flex flex-col fixed left-0 top-24 bottom-0 w-20 border-r border-white/5 items-center z-50 ">
            <Tooltip
                className="white-text"
                color="primary"
                content="Home"
                placement="right-end">
                <Link
                    href="/home"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/home" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineHome className={`${currentRoute === "/home" ? "active-icon" : "white-text"} w-[40px] h-[40px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Explore"
                placement="right-end">
                <Link
                    href="/explore"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/explore" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <FaRegCompass className={`${currentRoute === "/explore" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Posts"
                placement="right-end">
                <Link
                    href="/posts"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/posts" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineChatAlt className={`${currentRoute === "/posts" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Channel"
                placement="right-end">
                <Link
                    href="/channels"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/channels" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineFilm className={`${currentRoute === "/channels" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Groups"
                placement="right-end">
                <Link
                    href="/groups"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/groups" || currentRoute === "/groups/explore" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineUsers className={`${currentRoute === "/groups" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="chat with friends"
                placement="right-end">
                <Link
                    href="/chat"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/chat" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineChatAlt2 className={`${currentRoute === "/chat" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="events"
                placement="right-end">
                <Link
                    href="/events"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/events" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineCalendar className={`${currentRoute === "/events" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Snapshots"
                placement="right-end">
                <Link
                    href="/snapshots"
                    className={` p-2 mt-2 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/snapshots" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineCamera className={`${currentRoute === "/snapshots" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Collections"
                placement="right-end">
                <Link
                    href="/collections"
                    className={` p-2 mt-2  flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === "/collections" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <HiOutlineCollection className={`${currentRoute === "/collections" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                </Link>
            </Tooltip>
            <Tooltip
                className="white-text"
                color="primary"
                content="Meta wallet"
                placement="right-end">
                <Link
                    href=""
                    onClick={() => {
                        setMetaModal(true);
                    }}
                    className={` p-2 mt-1 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === `/account/${user?.bragname}` ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"}`}>
                    <span className="hover:scale-115 hover:brightness-150 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 212 189"
                            className="pr-2 pt-1 -pl-1 lg:pl-2 lg:w-10 lg:h-10">
                            <g
                                fill="none"
                                fill-rule="evenodd">
                                <polygon
                                    fill="#CDBDB2"
                                    points="60.75 173.25 88.313 180.563 88.313 171 90.563 168.75 106.313 168.75 106.313 180 106.313 187.875 89.438 187.875 68.625 178.875"
                                />
                                <polygon
                                    fill="#CDBDB2"
                                    points="105.75 173.25 132.75 180.563 132.75 171 135 168.75 150.75 168.75 150.75 180 150.75 187.875 133.875 187.875 113.063 178.875"
                                    transform="matrix(-1 0 0 1 256.5 0)"
                                />
                                <polygon
                                    fill="#393939"
                                    points="90.563 152.438 88.313 171 91.125 168.75 120.375 168.75 123.75 171 121.5 152.438 117 149.625 94.5 150.188"
                                />
                                <polygon
                                    fill="#F89C35"
                                    points="75.375 27 88.875 58.5 95.063 150.188 117 150.188 123.75 58.5 136.125 27"
                                />
                                <polygon
                                    fill="#F89D35"
                                    points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                                />
                                <polygon
                                    fill="#D87C30"
                                    points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
                                />
                                <polygon
                                    fill="#EA8D3A"
                                    points="46.125 101.813 65.25 119.813 65.25 137.813"
                                />
                                <polygon
                                    fill="#F89D35"
                                    points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
                                />
                                <polygon
                                    fill="#EB8F35"
                                    points="65.25 138.375 60.75 173.25 90.563 152.438"
                                />
                                <polygon
                                    fill="#EA8E3A"
                                    points="92.25 102.375 95.063 150.188 86.625 125.719"
                                />
                                <polygon
                                    fill="#D87C30"
                                    points="39.375 138.938 65.25 138.375 60.75 173.25"
                                />
                                <polygon
                                    fill="#EB8F35"
                                    points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
                                />
                                <polygon
                                    fill="#E8821E"
                                    points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
                                />
                                <polygon
                                    fill="#DFCEC3"
                                    points="60.75 173.25 90.563 152.438 88.313 170.438 88.313 180.563 68.063 176.625"
                                />
                                <polygon
                                    fill="#DFCEC3"
                                    points="121.5 173.25 150.75 152.438 148.5 170.438 148.5 180.563 128.25 176.625"
                                    transform="matrix(-1 0 0 1 272.25 0)"
                                />
                                <polygon
                                    fill="#393939"
                                    points="70.313 112.5 64.125 125.438 86.063 119.813"
                                    transform="matrix(-1 0 0 1 150.188 0)"
                                />
                                <polygon
                                    fill="#E88F35"
                                    points="12.375 .563 88.875 58.5 75.938 27"
                                />
                                <path
                                    fill="#8E5A30"
                                    d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                                />
                                <g transform="matrix(-1 0 0 1 211.5 0)">
                                    <polygon
                                        fill="#F89D35"
                                        points="16.313 96.188 .563 141.75 39.938 139.5 65.25 139.5 65.25 119.813 64.125 79.313 58.5 83.813"
                                    />
                                    <polygon
                                        fill="#D87C30"
                                        points="46.125 101.25 92.25 102.375 87.188 126 65.25 120.375"
                                    />
                                    <polygon
                                        fill="#EA8D3A"
                                        points="46.125 101.813 65.25 119.813 65.25 137.813"
                                    />
                                    <polygon
                                        fill="#F89D35"
                                        points="65.25 120.375 87.75 126 95.063 150.188 90 153 65.25 138.375"
                                    />
                                    <polygon
                                        fill="#EB8F35"
                                        points="65.25 138.375 60.75 173.25 90 153"
                                    />
                                    <polygon
                                        fill="#EA8E3A"
                                        points="92.25 102.375 95.063 150.188 86.625 125.719"
                                    />
                                    <polygon
                                        fill="#D87C30"
                                        points="39.375 138.938 65.25 138.375 60.75 173.25"
                                    />
                                    <polygon
                                        fill="#EB8F35"
                                        points="12.938 188.438 60.75 173.25 39.375 138.938 .563 141.75"
                                    />
                                    <polygon
                                        fill="#E8821E"
                                        points="88.875 58.5 64.688 78.75 46.125 101.25 92.25 102.938"
                                    />
                                    <polygon
                                        fill="#393939"
                                        points="70.313 112.5 64.125 125.438 86.063 119.813"
                                        transform="matrix(-1 0 0 1 150.188 0)"
                                    />
                                    <polygon
                                        fill="#E88F35"
                                        points="12.375 .563 88.875 58.5 75.938 27"
                                    />
                                    <path
                                        fill="#8E5A30"
                                        d="M12.3750002,0.562500008 L2.25000003,31.5000005 L7.87500012,65.250001 L3.93750006,67.500001 L9.56250014,72.5625 L5.06250008,76.5000011 L11.25,82.1250012 L7.31250011,85.5000013 L16.3125002,96.7500014 L58.5000009,83.8125012 C79.1250012,67.3125004 89.2500013,58.8750003 88.8750013,58.5000009 C88.5000013,58.1250009 63.0000009,38.8125006 12.3750002,0.562500008 Z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </span>
                </Link>
            </Tooltip>
            {metaModal && (
                <Modal
                    shouldCloseOnOverlayClick={true}
                    center
                    overlayClassName=""
                    className="tube-card-flat flex items-center justify-center mx-auto fixed right-0 left-0 z-50  bottom-0 top-0"
                    isOpen={metaModal}
                    onRequestClose={() => setMetaModal(false)}
                    style={{
                        overlay: {
                            backgroundColor: "rgb(0 0 0 / 12%)",
                            zIndex: 99,
                        },
                    }}>
                    <ConnectWalletComponent setMetaModal={setMetaModal} />
                </Modal>
            )}
            <div className="absolute bottom-5 left-0 flex justify-center items-center flex-col border-t w-full border-white/43">
                <Tooltip
                    className="white-text w-[50px]"
                    color="primary"
                    content="Profile"
                    placement="right-end">
                    <Link
                        href={`/profile/${user?.bragname}`}
                        className={` p-2 mt-1 flex justify-center items-center text-center 
  !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${currentRoute === `/account/${user?.bragname}` ? "card-bg w-[60px] h-[60px] ml-0 active-icon rounded-full" : "w-[50px] h-[50px] ml-0"}`}>
                        {user?.picture ? (
                            <Image
                                src={user?.picture}
                                alt={user?.bragname}
                                width={50}
                                height={50}
                                className="rounded-full object-cover w-[30px] h-[30px]"
                            />
                        ) : (
                            <div></div>
                        )}
                        {/* <UserImage
                        className={`ml-[1px] ${currentRoute === `/account/${user?.bragname}` ? "active-icon w-42 h-42" : ""}`}
                        picture={current?.picture}
                        userID={user?._id}
                        onlineStatus={true}
                        width={48}
                        height={48}
                        gender={user?.gender}
                    /> */}
                    </Link>
                </Tooltip>
                <Tooltip
                    className="white-text"
                    color="primary"
                    content="Logout"
                    placement="right-end">
                    <Link
                        href="/login"
                        onClick={handleLogout}
                        className={` p-2 mt-1 flex justify-center items-center text-center !cursor-pointer rounded-full hover:bg-[#FFFFFF0D] ${
                            currentRoute === "/login" ? "card-bg w-[45px] h-[45px] ml-1" : "w-[40px] h-[40px] ml-2"
                        }`}>
                        <HiOutlineLogout className={`${currentRoute === "/login" ? "active-icon" : "white-text"} w-[32px] h-[32px] rounded-full`} />
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};

export default LeftNav;

// No Votes
