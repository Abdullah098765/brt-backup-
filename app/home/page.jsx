import { Suspense } from "react";
import dynamic from "next/dynamic";
const VideoSlider = dynamic(() => import("../../components/HOME/Slider"));
const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
    return (
        <div className="flex justify-center flex-col">
            <VideoSlider
                slides={SLIDES}
                options={OPTIONS}
            />
        </div>
    );
}
