import { useRouter } from "next/navigation";
import useWindowDimensions from "../../../hooks/useWindowSize";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import CommonModel from "./commonModel";
import Confetti from "react-confetti";
export default function SuccessMessage() {
    const { height, width } = useWindowDimensions();
    const route = useRouter();
    return (
        <>
            <CommonModel
                title="Congratulations"
                desc=""
                buttonText="Home"
                onClick={() => route.push("/home")}>
                <div className="text-center space-y-4">
                    <p className="text-xl">You successfully create challenge 🎉</p>
                    <p>Invite Friends to vote on you challenge </p>
                    <p>As much as vote you get you chance to win</p>
                </div>
            </CommonModel>
            <Confetti
                width={width}
                height={height}
            />
        </>
    );
}
