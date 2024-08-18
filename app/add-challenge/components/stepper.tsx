import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";
export default function Stepper() {
    const { step } = useChallengeCreate();
    let steps = <span className="w-[50px] md:w-[100px] bg-white/20 h-2 flex rounded-lg"></span>;
    let stepGradient = <span className="rounded-lg h-2 border-[#C7FFD0] border w-[50px] md:w-[100px] bg-white/20"></span>;
    let stepper = (
        <>
            {stepGradient}
            {steps}
            {steps}
            {steps}
        </>
    );
    if (step === "CATEGORY") {
        stepper = (
            <>
                {steps}
                {stepGradient}
                {steps}
                {steps}
            </>
        );
    }
    if (step === "OPTION") {
        stepper = (
            <>
                {steps}
                {steps}
                {stepGradient}
                {steps}
            </>
        );
    }
    if (step === "FORM" || step == "SUCCESS_MESSAGE") {
        stepper = (
            <>
                {steps}
                {steps}
                {steps}
                {stepGradient}
            </>
        );
    }
    return (
        <div className="flex justify-between items-center px-10 text-white border-b pb-6 border-white/10">
            <span className="hidden md:flex">{ICONS["CROSS"].Icon}</span>
            <span className="flex md:hidden"> {ICONS["LEFT_ARROW"].Icon}</span>
            <div className="flex gap-4 items-center">
                <span className="mr-4 hidden md:flex"> {ICONS["LEFT_ARROW"].Icon}</span>
                {stepper}
                <span className="ml-4 hidden md:flex">{ICONS["RIGHT_ARROW"].Icon}</span>
            </div>
            <span className="flex gap-2">
                <span className="text-xl">1</span> {ICONS["LIGHT"].Icon}
            </span>
        </div>
    );
}
