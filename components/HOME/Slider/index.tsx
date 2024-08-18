"use client";
import React, { RefObject, memo, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButtons";
import { DotButton, useDotButton } from "./CarouselDotButton";
import { useChallengeStore } from "../../../state/useChallengeStore";
import Image from "next/image";
import { ICONS } from "../../../icons";
import { showToastInfo } from "../../../notification";
import { useRouter } from "next/navigation";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);

const VideoSlider = (props) => {
    const route = useRouter();
    const { findAllChallenges, challenges, requestChallengeInvite, likeAndUnlike, bookmark, vote } = useChallengeStore();
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const videoRefs = useRef<Array<RefObject<HTMLVideoElement>>>([]);
    const tweenNodes = useRef<Array<HTMLVideoElement | null>>([]);
    // const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    const setTweenNodes = useCallback((emblaApi) => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            const slide = slideNode.querySelector(".embla__slide__number");
            return slide;
        });
    }, []);

    const setTweenFactor = useCallback((emblaApi) => {
        tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenScale = useCallback((emblaApi, eventName) => {
        const engine = emblaApi.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const slidesInView = emblaApi.slidesInView();
        const isScrollEvent = eventName === "scroll";

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {
                if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
                const scale = numberWithinRange(tweenValue, 0, 1).toString();
                const tweenNode = tweenNodes.current[slideIndex];

                tweenNode.style.transform = `scale(${scale})`;
            });
        });
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenScale(emblaApi, "");

        emblaApi.on("reInit", setTweenNodes).on("reInit", setTweenFactor).on("reInit", tweenScale).on("scroll", tweenScale);
    }, [emblaApi, tweenScale]);

    useEffect(() => {
        findAllChallenges();
    }, []);

    useEffect(() => {
        if (videoRefs[0]) {
            for (let index in videoRefs) {
                if (videoRefs[index] && videoRefs[index]) {
                    videoRefs[index].pause();
                }
            }

            // Play the selected video
            if (selectedIndex !== null && videoRefs[selectedIndex]) {
                videoRefs[selectedIndex].play();
            }
        }
    }, [selectedIndex, videoRefs]);

    const handleRequestSubmit = (challenge) => {
        if (!challenge?.challenged) requestChallengeInvite(challenge._id);
    };

    const handleVote = (challenge) => {
        if (!challenge.start) {
            showToastInfo("You can vote when challenge status is started");
        } else {
            vote(challenge);
        }
    };

    return (
        <div className="embla">
            <div
                className="embla__viewport"
                ref={emblaRef}>
                <div className="embla__container">
                    {challenges.length &&
                        challenges?.map((challenge, index) => (
                            <div
                                className="embla__slide"
                                onClick={() => route.push(`/challenges/${challenge.slug}`)}>
                                <div className="embla__slide__number relative">
                                    <span className="text-lg font-bold mb-2 absolute top-2 left-4 capitalize">{challenge.name}</span>
                                    <span className="text-lg font-bold mb-2 absolute top-2 right-4 capitalize">{challenge.start ? "Start" : "No Started"}</span>
                                    <video
                                        ref={(el) => {
                                            if (el && !videoRefs.current[index]) {
                                                videoRefs.current[index] = React.createRef();
                                            }
                                            if (videoRefs.current[index]) {
                                                (videoRefs.current[index] as React.MutableRefObject<HTMLVideoElement | null>).current = el;
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
                                        <div className="flex justify-center flex-col items-center">
                                            <span
                                                onClick={() => handleVote(challenge)}
                                                className="w-6 h-6">
                                                {challenge?.participants[0].isVoted ? ICONS["FIRE_FILL"].Icon : ICONS["FIRE"].Icon}
                                            </span>

                                            <span className="text-xs text-white">{challenge?.participants[0].voteCount || 0}</span>
                                        </div>
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
                            </div>
                        ))}
                    {/* {slides.map((index) => (
                        <div
                            className="embla__slide"
                            key={index}>
                         
                        </div>
                    ))} */}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={"embla__dot".concat(index === selectedIndex ? " embla__dot--selected" : "")}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(VideoSlider);
