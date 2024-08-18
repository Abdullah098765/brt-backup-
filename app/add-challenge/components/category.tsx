import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import CommonModel from "./commonModel";

export default function Category() {
    const { setStep, category, setCategory } = useChallengeCreate();
    let CategoriesData = [
        {
            name: "Beginner",
            disable: false,
        },
        {
            name: "Adventure",
            disable: true,
        },
        {
            name: "Dare",
            disable: true,
        },
        {
            name: "Familty",
            disable: true,
        },
        {
            name: "General",
            disable: true,
        },
        {
            name: "Group",
            disable: true,
        },
        {
            name: "Health",
            disable: true,
        },
        {
            name: "Skills",
            disable: true,
        },
        {
            name: "Strategy",
            disable: true,
        },
    ];
    const handleNext = () => {
        setStep("OPTION");
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
                        onClick={() => setCategory(ct.name)}
                        className={`${ct.disable ? "bg-primarySecond/50" : "bg-primarySecond"}  p-4 rounded-lg flex items-center justify-center gap-3 text-lg min-w-40`}
                        key={ct.name}>
                        {ct.name} {category === ct.name && "✅"} {ct.disable && ICONS["LOCK"].Icon}
                    </button>
                ))}
            </div>
        </CommonModel>
    );
}
