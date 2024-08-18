import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import CommonModel from "./commonModel";

export default function Rules() {
    const { setStep } = useChallengeCreate();
    let options = [
        {
            desc: "Create or add a video",
        },
        {
            desc: "Invite Friends to vote for you",
        },
        {
            desc: "Share challenges link to get more participants",
        },
    ];
    const handleNext = () => {
        setStep("CATEGORY");
    };
    return (
        <CommonModel
            RightIcon={ICONS["RULES"].Icon}
            desc="To start your challenge, you have to;"
            title="General Rules"
            buttonIcon={ICONS["LIGHT"].Icon}
            buttonText="Let's Start"
            onClick={handleNext}>
            <>
                {options.map((option, index) => (
                    <div
                        key={option.desc}
                        className="flex gap-4 items-center my-4">
                        <span className="w-8 h-8 bg-primarySecond/20 rounded-full flex justify-center items-center">{index + 1}</span>
                        <span className="flex text-xl">{option.desc}</span>
                    </div>
                ))}
            </>
        </CommonModel>
    );
}
