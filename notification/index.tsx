import React from "react";
import { toast } from "react-hot-toast";
import { ICONS } from "../icons";

const toastTypeToIconMap = {
    success: ICONS["TICK"].Icon,
    error: ICONS["ERROR"].Icon,
    info: ICONS["INFO"].Icon,
};

const toastTypeToDefaultTextMap = {
    success: "Yay, success! Your changes have been saved.",
    error: "Whoops, not working. Retry or get in touch.",
    info: "Info, your data is being validated. Keep calm.",
};
const CustomToast = ({ t, message, type }) => {
    const icon = toastTypeToIconMap[type];
    const defaultText = toastTypeToDefaultTextMap[type];
    return (
        <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} overflow-hidden  max-w-md w-full ${
                type === "error" ? "bg-secondary" : type === "success" ? "bg-primarySecond" : "bg-primary"
            } text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4 ">
                <div className="flex items-start">
                    <div>{icon}</div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium">{defaultText}</p>
                        <p className="mt-1 text-sm">{message}</p>
                    </div>
                </div>
            </div>

            <div className="flex  border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Close
                </button>
            </div>
        </div>
    );
};

const options = { duration: 5000 };

const showToast = (type, message) => {
    toast.custom(
        (t) => (
            <CustomToast
                t={t}
                message={message}
                type={type}
            />
        ),
        options
    );
};

export const showToastError = (message) => showToast("error", message);
export const showToastSuccess = (message) => showToast("success", message);
export const showToastInfo = (message) => showToast("info", message);
