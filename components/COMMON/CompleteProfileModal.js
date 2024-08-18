"use client";
import React from "react";
import RegisterUserForm from "../../components/AUTH/RegisterUserForm";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "../../state/useUserStore";

export default function CompleteProfileModal() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUserStore();

    const handleClose = () => {
        router.push(`${pathname}`);
    };

    const isCompleteProfileModalOpen = user?.completeInfo;
    console.log({ isCompleteProfileModalOpen });
    if (!user) return null;
    if (isCompleteProfileModalOpen) return null;
    return (
        <div
            id="myModal"
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isCompleteProfileModalOpen ? "hidden" : "flex"}`}>
            <div className="modal-overlay absolute inset-0  overflow-hidden bg-black opacity-50"></div>

            <div className="modal-container overflow-hidden pb-4 bg-gray-800 w-[50rem] px-9 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                {/* Close button */}
                <button
                    className="absolute top-8 right-10 text-white hover:text-gray-300 focus:outline-none"
                    onClick={handleClose}>
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

                <RegisterUserForm />
            </div>
        </div>
    );
}
