import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
const NotificationPrompt = dynamic(() => import("../components/NOTIFICATION"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Bragtime",
    description: "Bragtime is a social media platform for video challenges, where users can create and participate in exciting video challenges.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
                <Toaster position="top-right" />
                <Suspense fallback={<div>Loading...</div>}>
                    <NotificationPrompt />
                </Suspense>
            </body>
        </html>
    );
}
