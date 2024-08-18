"use client";
import CloseButton from "../buttons/CloseButton";
import { useModelsStore } from "../../../state/useModelsStore";
import AddChallengesModal from "../../CHALLENGES/AddChallengesModal";

const ModalLG = () => {
    const { close, isOpen, model } = useModelsStore();

    const modelMap = {
        CHALLENGE: { component: AddChallengesModal, title: "Create a Challenge" },
        EVENT: { component: () => <h1>here is the Events modal</h1>, title: "Create an Event" },
        GROUP: { component: () => <h1>here is the Groups modal</h1>, title: "Create a Group" },
        SNAPSHOT: { component: () => <h1>here is the snapshot modal</h1>, title: "Create a Snapshot" },
    };

    const { component: Component, title } = modelMap[model] || {
        component: null,
        title: "",
    };

    return (
        <>
            {isOpen && (
                <div className="fixed  inset-0 overflow-hidden !z-50 flex justify-center items-center mt-[23%] mdl:mt-[5.5%]">
                    <div className="fixed inset-0 bg-black opacity-70 h-[100%]"></div>
                    <div
                        className="relative btn-blue rounded-lg 
                     w-full h-auto min-h-80 max-h-[677px] mdl:w-[550px] overflow-y-auto overflow-x-hidden no-scrollbar white-text !z-50">
                        <div className="w-full h-14 modalHeader flex justify-center items-center space-x-3">
                            <h1 className="text-[#fff] text-2xl mdl:text-[40px] font-bold">{title}</h1>
                            <CloseButton
                                handleClose={close}
                                className=""
                            />
                        </div>
                        {Component && <Component />}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalLG;
