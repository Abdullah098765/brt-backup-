"use client";
import { memo, useEffect, useRef } from "react";
import { useChallengeStore } from "../../../state/useChallengeStore";
import { useClickAway } from "react-use";
import { useRouter } from "next/navigation";

function PurchaseVotes() {
    const { isPurchase, setIsPurchase } = useChallengeStore();
    const ref = useRef(null);
    const route = useRouter();

    const handleClose = () => {
        setIsPurchase(false);
        //@ts-ignore
        document.getElementById("my_modal_5").close();
    };
    useEffect(() => {
        if (isPurchase) {
            //@ts-ignore
            document.getElementById("my_modal_5").showModal();
        }
    }, [isPurchase]);

    useClickAway(ref, () => {
        handleClose();
    });

    const handleNavigate = () => {
        handleClose();
        route.push("/packages");
    };

    return (
        <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle bg-white/20">
            <div
                ref={ref}
                className="modal-box bg-primarySecond text-white">
                <h3 className="font-bold text-lg">Purchase Vote</h3>
                <p className="py-4">Thanks for supporting our challenge! Your votes will help us reach our goal. Complete your purchase to cast your votes and make a difference.</p>
                <div className="modal-action">
                    <button
                        onClick={handleNavigate}
                        className="btn w-full">
                        Purchase
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default memo(PurchaseVotes);
