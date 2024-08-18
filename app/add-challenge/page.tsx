"use client";
import Navbar from "../../components/COMMON/layout/Navbar";
import Stepper from "./components/stepper";
import Category from "./components/category";
import { useChallengeCreate } from "../../state/useChallengeForm";
import Rules from "./components/rules";
import ChallengeForm from "./components/challengeForm";
import Options from "./components/options";
import SuccessMessage from "./components/message";
import InviteUser from "./components/invite";

export default function CreateChallenges() {
    const { step } = useChallengeCreate();

    const stepMap = {
        CATEGORY: { component: Category },
        RULES: { component: Rules },
        FORM: { component: ChallengeForm },
        OPTION: { component: Options },
        INVITE: { component: InviteUser },
        SUCCESS_MESSAGE: { component: SuccessMessage },
    };

    const { component: Component } = stepMap[step] || {
        component: null,
    };
    return (
        <div
            style={{
                background: "url(/assets/background/bg.webp)",
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                overflow: "hidden",
            }}>
            <div className="w-full h-full bg-black/30">
                <Navbar />
                <Stepper />
                {Component && <Component />}
            </div>
        </div>
    );
}
