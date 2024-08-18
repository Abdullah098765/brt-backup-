import Image from "next/image";
import { ICONS } from "../../../icons";
import React, { RefObject } from "react";
//for video props. needed for typescript
interface VideoItemProps {
    videoRefs: RefObject<HTMLVideoElement[]>;
    challenge: any;
    index: number;
    handleRequestSubmit: (challenge: any) => void;
    likeAndUnlike: (id: string) => void;
    bookmark: (id: string) => void;
}
export const VideoItem: React.FC<VideoItemProps> = ({ videoRefs, challenge, index, handleRequestSubmit, likeAndUnlike, bookmark }) => {
   
    return (
        <div className="embla__slide__number relative">
            <span className="text-lg font-bold mb-2 absolute top-2 left-4 capitalize">{challenge.name}</span>
            <span className="text-lg font-bold mb-2 absolute top-2 right-4 capitalize">{challenge.start || "NO Started"}</span>
            <video
                ref={(ref) => {
                    if (videoRefs.current) {
                        videoRefs.current[index] = ref;
                    }
                }}
                src={challenge?.participants[0].videoUrl}
                className="object-cover w-full h-full"
            />{" "}
            <div className="text-lg font-bold mb-2 absolute bottom-4 right-4 capitalize flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                    <Image
                        src={challenge?.userId[0]?.picture}
                        alt={`User - ${challenge?.userId[0]?.firstname}`}
                        width={100}
                        height={100}
                        className="w-6 h-6 rounded-full"
                    />
                    <p className="text-xs text-white">{challenge?.userId[0]?.firstname}</p>
                </div>
                <span
                    onClick={() => handleRequestSubmit(challenge)}
                    className="w-6 h-6">
                    {challenge?.challenged ? ICONS["HANDSHAKE_FILL"].Icon : ICONS["HANDSHAKE"].Icon}
                </span>
                <div className="flex justify-center flex-col items-center">
                    <span
                        onClick={() => likeAndUnlike(challenge._id)}
                        className="w-6 h-6 relative flex flex-col">
                        {challenge.like ? ICONS["HEART_FILL"].Icon : ICONS["HEART"].Icon}
                    </span>
                    <span className="text-xs text-white">{challenge?.likeCount || 0}</span>
                </div>

                {ICONS["COMMENT"].Icon}
                {ICONS["FIRE"].Icon}
                <div className="flex justify-center flex-col items-center">
                    <span
                        onClick={() => bookmark(challenge._id)}
                        className="w-6 h-6">
                        {challenge?.bookmark ? ICONS["BOOKMARK_FILL"].Icon : ICONS["BOOKMARK"].Icon}
                    </span>
                    <span className="text-xs text-white">{challenge?.bookmarkCount || 0}</span>
                </div>
                {ICONS["SHARE"].Icon}
            </div>
        </div>
    );
};
