"use client";
import { auth } from "../../../firebaseConfig";
import { applyActionCode } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useMobile } from "../../hooks/useMobile";
import Image from "next/image";
import gsap from "gsap";
import RegisterUserForm from "./RegisterUserForm";
import { useAuthState } from "react-firebase-hooks/auth";
import VerifiedButNotLoggedIn from "../COMMON/VerifiedButNotLoggedIn";
// import { isMobile, isIOS } from "react-device-detect";
import MobileVerifiedScreen from "./MobileVerifiedScreen";

const fadeImages = ["/images/auth/s1.jpg", "/images/auth/s2.png", "/images/auth/s3.jpg", "/images/auth/s4.png", "/images/auth/s5.png"];

const fadeMobileImages = ["/images/auth/m1.png", "/images/auth/m2.png", "/images/auth/m3.png", "/images/auth/m4.png", "/images/auth/m5.png"];
const options = [
    { value: "gender", label: "Gender", disabled: true },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

export default function RegesterUser() {
    const isMobile = useMobile();
    const [currentUser, loading] = useAuthState(auth);
    useEffect(() => {
        console.log(isMobile);
    });
    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const oobCode = searchParams.get("oobCode");

        if (oobCode) {
            applyActionCode(auth, oobCode)
                .then(() => {
                    if (auth) {
                        auth.currentUser
                            ?.reload()
                            ?.then(async () => {
                                console.log("Email verification completed.");
                                console.log("Updated emailVerified:", auth.currentUser.emailVerified);
                            })
                            .catch((error) => {
                                console.error("Error reloading user:", error);
                            });
                    } else {
                        console.error("No user signed in.");
                    }
                })
                .catch((error) => {
                    console.error("Error applying action code:", error);
                });
        } else console.log("invalid oobCode");

        console.log(oobCode);
    }, []);
    useEffect(() => {
        async function runFade() {
            const images = document.querySelectorAll(".fade-image");
            const duration = 2.5;
            const fadeInDuration = 1;
            const visibleDuration = 1.5;

            images.forEach((image, index) => {
                const fadeInDelay = index * (fadeInDuration + visibleDuration);
                const fadeOutDelay = fadeInDelay + fadeInDuration + visibleDuration;

                const fadeInAnimation = gsap.fromTo(image, { opacity: 0 }, { opacity: 1, duration: fadeInDuration, delay: fadeInDelay });

                const visibleAnimation = gsap.to(image, {
                    opacity: 1,
                    duration: visibleDuration,
                    delay: fadeInDelay + fadeInDuration,
                });

                const fadeOutAnimation = gsap.to(image, {
                    opacity: 0,
                    duration: fadeInDuration,
                    delay: fadeOutDelay,
                });

                const nextIndex = (index + 1) % images.length;
                const nextImage = images[nextIndex];
                const nextStartTime = fadeInDelay + fadeInDuration + visibleDuration;

                const nextFadeInAnimation = gsap.fromTo(nextImage, { opacity: 0 }, { opacity: 1, duration: fadeInDuration, delay: nextStartTime });

                fadeInAnimation.then(() => {
                    visibleAnimation.then(() => {
                        fadeOutAnimation.then(() => {
                            nextFadeInAnimation.restart();
                        });
                    });
                });
            });
        }
        runFade();
        return () => {
            // Clean up animations if needed
        };
    }, []);

    if (loading) return null;

    if (isMobile) return <MobileVerifiedScreen />;
    else if (currentUser)
        return (
            <div
                data-aos="fade-up"
                data-aos-duration="500"
                className="w-screen h-screen main-bg min-h-screen min-w-screen flex  items-center overflow-hidden bg-gray-800">
                <RegisterUserForm />

                {!isMobile ? (
                    <div className="absolute z-30 mdl:flex flex-col items-center text-center w-full h-full  mdl:relative">
                        {fadeImages.map((path, index) => (
                            <div
                                key={index}
                                className="fade-image absolute w-full h-full">
                                <Image
                                    src={path}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full"
                                    layout="fill"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="absolute z-30 mdl:flex flex-col items-center text-center w-full h-full  mdl:relative">
                        {fadeMobileImages.map((path, index) => (
                            <div
                                key={index}
                                className="fade-image absolute w-full h-full">
                                <Image
                                    src={path}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full"
                                    layout="fill"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    else if (!currentUser) return <VerifiedButNotLoggedIn />;
}
