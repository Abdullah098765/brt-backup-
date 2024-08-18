import dynamic from "next/dynamic";
import "./globals.css";
const Main = dynamic(() => import("../components/LANDING/Main"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full absolute left-0 right-0 top-0 bottom-0 m-auto bg-[#000] ring">
            Loading...
            <span></span>
        </div>
    ),
});
const DiscoverSection = dynamic(() => import("../components/LANDING/DiscoverSection"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full absolute left-0 right-0 top-0 bottom-0 m-auto bg-[#000] ring">
            Loading...
            <span></span>
        </div>
    ),
});

export default function App() {
    return (
        <div className="w-full h-full flex flex-col items-center pt-2 overflow-x-hidden">
            <Main />
            <DiscoverSection />
        </div>
    );
}
