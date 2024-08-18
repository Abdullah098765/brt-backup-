"use client";
import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { auth } from "../../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserStore } from "../../../state/useUserStore";
import { useRouter } from "next/navigation";
import { signOut } from "@firebase/auth";
import { createCookies } from "../../../cookies/setCookies";
const ThirdwebProviderComp = dynamic(() => import("../../../providers/ThirdwebProvider"), { ssr: false });
const Navbar = dynamic(() => import("./Navbar"), {
    loading: () => <div className="h-32 bg-[#0043e3]/20 animate-pulse"></div>,
});
const Sidebar = dynamic(() => import("./Sidebar"));

const AppLayout = ({ children }) => {
    const { fetchUserData, user } = useUserStore();

    const [currentUser, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        const id = setTimeout(() => {
            if (!currentUser) {
                signOut(auth)
                    .then(() => {
                        createCookies(null);
                        router.push("/login");
                    })
                    .catch((error) => console.log({ error }));
            }
        }, 2000);
        return () => clearTimeout(id);
    }, [currentUser]);

    useEffect(() => {
        if (!user && currentUser) fetchUserData();
    }, [user, currentUser]);

    console.log({ user, currentUser });

    return (
        <ThirdwebProviderComp>
            <div className="w-screen h-screen mt-0 flex flex-col">
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>
                <Suspense fallback={null}>
                    <Sidebar />
                </Suspense>
                <div className="flex-grow ml-0 lg:ml-20">{children}</div>
            </div>
        </ThirdwebProviderComp>
    );
};

export default AppLayout;
