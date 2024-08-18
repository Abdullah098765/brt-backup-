import { useRouter } from "next/navigation";
import { useModelsStore } from "../../../state/useModelsStore";

export default function LetsGo() {
    const route = useRouter();
    const { close } = useModelsStore();
    return (
        <div className="w-full h-full flex flex-col justify-center items-center pt-10">
            <h1 className="text-[#fff] text-2xl mdl:text-4xl text-center">Are you ready to challenge a friend or mate?</h1>
            <button
                className="modalStartBtn mt-10"
                onClick={() => {
                    route.push("/add-challenge");
                    close();
                }}>
                Let's Go
            </button>
        </div>
    );
}
