import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";

interface IProps {
    children: JSX.Element;
    RightIcon?: JSX.Element;
    title: string;
    desc: string;
    buttonText?: string;
    buttonIcon?: JSX.Element;
    onClick?: () => void;
}
export default function CommonModel({ children, RightIcon, desc, title, buttonIcon, onClick, buttonText = "Continue" }: IProps) {
    const { errorMessage, loading } = useChallengeCreate();
    return (
        <div className="text-white md:container md:mx-auto flex mt-10 md:gap-10 overflow-hidden mx-4">
            <div className={`w-full ${RightIcon ? "md:w-7/12" : "w-full"}`}>
                <div className={`relative max-w-screen-md bg-primary border border-white/50 rounded-2xl p-10 ${RightIcon ? "ml-auto" : "mx-auto"}`}>
                    <h1 className="text-center text-3xl">{title}</h1>
                    <p className="text-center text-3xl h-8">{desc}</p>
                    {errorMessage && <p className="text-red-500 text-center absolute top-28 left-10">{errorMessage}</p>}
                    <div className="mt-10 min-h-64">{children}</div>
                    <button
                        disabled={loading}
                        onClick={onClick}
                        className="bg-secondary mx-auto flex mt-14 p-4 px-20 rounded-full border border-white/50 items-center justify-center gap-4">
                        <span>{loading ? "Loading..." : buttonText}</span> <span>{buttonIcon ? buttonIcon : ICONS["CONTINUE"].Icon}</span>
                    </button>
                </div>
            </div>
            {RightIcon && <div className="hidden md:flex md:w-5/12">{RightIcon}</div>}
        </div>
    );
}
