'use client'
import { useMemo } from "react";
import { videoTutorialUrl } from "../../utils/url";

export default function Promo({ videoRef, isMuted, setIsMuted, toggleMute }) {
    const pitch = useMemo(() => videoTutorialUrl("pitch.mp4"), []);

    return (
        <div className="absolute -top-60 -bottom-10 right-0 left-0 min-w-[100vw] max-w-[100vw] object-cover">
            <video
                autoPlay
                loop
                muted={isMuted}
                playsinline
                play
                className="w-full h-full"
                ref={videoRef}
                style={{ objectFit: "cover", zIndex: "-1", opacity: "0.2" }}>
                <source
                    src={pitch}
                    type="video/mp4"
                />
            </video>
        </div>
    );
}
