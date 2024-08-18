"use client";
import { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from "@nextui-org/react";
import { BsBellFill, BsBell } from "react-icons/bs";
import { useNotifications } from "../../../state/useNotification";
import { useClickAway } from "react-use";
import { ICONS } from "../../../icons";
import { showToastInfo } from "../../../notification";
import { useChallengeStore } from "../../../state/useChallengeStore";

const NotificationDropdown = () => {
    const ref = useRef(null);
    const { show, setShow, notifications, fetchNotifications, setNotification, notification, setNotificationsStatus } = useNotifications();
    const { acceptChallenge, acceptLoading, rejectChallenge } = useChallengeStore();
    const [video, setVideo] = useState({ file: null, preview: "" });

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleClose = () => {
        if (show) {
            setShow(false);
        }
    };
    useClickAway(ref, handleClose);

    const handleChangeVideo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo({ file: file, preview: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = () => {
        if (!video.preview) {
            showToastInfo("You need to upload challenge");
        }
        const formData = new FormData();
        formData.append("challengeId", notification.featherId);
        formData.append("file", video.file);
        acceptChallenge(formData);
        setNotificationsStatus("ACCEPT");
    };

    const handleReject = (noti) => {
        rejectChallenge(noti.featherId);
        setNotification(noti);
        setNotificationsStatus("REJECT");
    };

    const customModelRender = (
        <dialog
            id="my_modal_3"
            className="modal">
            <div className="modal-box bg-primarySecond text-white">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Accept Challenge</h3>
                <label
                    htmlFor="video"
                    className="border w-full border-white/10 flex justify-between rounded-lg mt-10">
                    {video.preview ? (
                        <div className="flex flex-col w-full">
                            <video
                                src={video.preview}
                                className="w-full h-32 object-cover"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={acceptLoading}
                                className="w-full text-white p-3">
                                {acceptLoading ? "Loading..." : "Accept"}
                            </button>
                        </div>
                    ) : (
                        <div className="p-10 flex gap-5 hover:bg-primary">
                            <span className="mt-2">{ICONS["UPLOAD"].Icon}</span>
                            <p>Inorder to Accept challenge you need to upload the video to start challenge between both of you</p>
                        </div>
                    )}
                </label>
                <input
                    accept="video/*"
                    id="video"
                    type="file"
                    onClick={handleChangeVideo}
                    className="hidden"
                />
            </div>
        </dialog>
    );

    return (
        <div
            className="lg:mr-3 mr-0 relative"
            ref={ref}>
            <Dropdown>
                <DropdownTrigger onClick={() => setShow(!show)}>
                    {show ? (
                        <BsBellFill className="w-8 h-8 rounded-full bg-white/10 lg:bg-transparent p-1 lg:p-0 red-text animate-pulse" />
                    ) : (
                        <BsBell className="w-8 h-8 main-text rounded-full bg-white/10 lg:bg-transparent p-[6px] lg:p-0" />
                    )}
                </DropdownTrigger>
                <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with icons">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger">
                        Delete file
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {show && (
                <div className="absolute top-10 right-0 min-w-72 p-3 rounded-xl bg-primarySecond z-50 ">
                    {notifications.map((noti) => (
                        <div
                            key={noti.id}
                            className="border border-white/10 rounded-xl my-2 p-2 flex text-white flex-col">
                            <p className="font-bold capitalize">{noti.title}</p>
                            <p className="text-xs">{noti.description}</p>
                            {noti.status === "PENDING" && (noti.notificationType === "CHALLENGE_REQUEST" || noti.notificationType === "CHALLENGES") && (
                                <div className="flex justify-between text-xs mt-2 gap-3">
                                    <button
                                        onClick={() => {
                                            setNotification(noti);
                                            document.getElementById("my_modal_3").showModal();
                                        }}
                                        className="border border-white/10 w-full p-2 rounded-xl">
                                        ACCEPT
                                    </button>
                                    <button
                                        onClick={() => handleReject(noti)}
                                        className="border border-white/10 w-full p-2 rounded-xl bg-red-500">
                                        REJECT
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button className="border text-white w-full border-white/10 rounded-xl p-2">Load More</button>
                </div>
            )}
            {customModelRender}
        </div>
    );
};

export default NotificationDropdown;
