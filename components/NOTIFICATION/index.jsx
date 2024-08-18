"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../../state/useUserStore";
import { app } from "../../../firebaseConfig";
if ("Notification" in window) {
    console.log("supported");
} else {
    console.log(" not supported");
}
const NotificationPrompt = () => {
    const { updateFcmToken, user, fetchUserData } = useUserStore();
    const [notification, setNotifcation] = useState({
        isNotify: false,
        data: {
            body: "",
            image: "",
            title: "",
        },
    });

    useEffect(() => {
        // Check if the browser supports notifications
        if ("Notification" in window && user) {
            const config = async () => {
                const { getToken, getMessaging } = await import("firebase/messaging");
                const firebaseMessaging = getMessaging(app);
                if (Notification.permission === "granted") {
                    getToken(firebaseMessaging, { vapidKey: "BLuqbxr7Fw1Jmm8EyLSrXCrzoJrDYA-c1FYFD7_bmFlNR9Ukz5aXCWZAfhon0rRmcsnK9BbbVkso72cnRrP89z8" })
                        .then((response) => {
                            /**
                             * if token is same then
                             * return if not then save again
                             **/
                            console.log({ response, fcmToken: user?.fcmToken });
                            if (user?.fcmToken === response) return;
                            updateFcmToken(response);
                        })
                        .catch((error) => console.log("FCM TOKEN", { error }));
                }
                if (Notification.permission === "default") {
                    Notification.requestPermission((result) => {
                        console.log({ result });
                    });
                }
            };
            config();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && "navigator" in window && "serviceWorker" in navigator) {
            let unsubscribe;
            const config = async () => {
                const { getMessaging, onMessage } = await import("firebase/messaging");

                const firebaseMessaging = getMessaging(app);
                unsubscribe = onMessage(firebaseMessaging, (payload) => {
                    console.log("Foreground push notification received:", payload);

                    setNotifcation({ isNotify: true, data: payload.notification });
                    setTimeout(() => {
                        handleClose();
                    }, 10000);
                });
            };
            config();
            return () => {
                if (typeof unsubscribe === "function") {
                    unsubscribe();
                }
            };
        }
    }, []);

    const handleClose = () => {
        setNotifcation({
            isNotify: false,
            data: {
                body: "",
                image: "",
                title: "",
            },
        });
    };

    if (!notification.isNotify) return null;

    return (
        <div
            id="toast-message-cta"
            className="fixed top-4 right-4 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
            role="alert">
            <div className="flex">
                <img
                    className="w-8 h-8 rounded-full"
                    src={notification.data.image}
                    alt="Jese Leos image"
                />
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{notification.data.title}</span>
                    <div className="mb-2 text-sm font-normal">{notification.data.body}</div>
                </div>
                <button
                    onClick={handleClose}
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-message-cta"
                    aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NotificationPrompt;
