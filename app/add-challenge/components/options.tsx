import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import CommonModel from "./commonModel";

export default function Options() {
    const { setStep, setOption, option } = useChallengeCreate();
    let CategoriesData = [
        {
            name: "Action",
            disable: false,
        },
        {
            name: "Adventure",
            disable: false,
        },
        {
            name: "Comedy",
            disable: false,
        },
        {
            name: "Drama",
            disable: false,
        },
        {
            name: "Horror",
            disable: false,
        },
        {
            name: "Romance",
            disable: false,
        },
    ];
    const handleNext = () => {
        setStep("FORM");
    };
    return (
        <CommonModel
            RightIcon={ICONS["CUBE"].Icon}
            desc=""
            title="Choose Category"
            onClick={handleNext}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {CategoriesData.map((ct) => (
                    <button
                        onClick={() => setOption(ct.name)}
                        className={`${ct.disable ? "bg-primarySecond/50" : "bg-primarySecond"}  p-4 rounded-lg flex items-center justify-center gap-3 text-lg min-w-40`}
                        key={ct.name}>
                        {ct.name} {option === ct.name && "✅"} {ct.disable && ICONS["LOCK"].Icon}
                    </button>
                ))}
            </div>
        </CommonModel>
    );
}
