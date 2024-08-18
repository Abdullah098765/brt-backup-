import { create } from "zustand";

type MODEL = "RULES" | "CHALLENGE" | "EVENT" | "GROUP" | "SNAPSHOT";
interface IProps {
    model: MODEL;
    isOpen: boolean;
    openModel: (model: MODEL) => void;
    close: () => void;
}

export const useModelsStore = create<IProps>((set, get) => ({
    model: "RULES",
    isOpen: false,
    openModel(model) {
        set({ isOpen: true, model: model });
    },
    close() {
        set({ isOpen: false, model: "RULES" });
    },
}));
