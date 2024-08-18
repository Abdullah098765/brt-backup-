import { create } from "zustand";
import { ChallengeService } from "../apiService/challengeService";
import { showToastError } from "../notification";

type StepType = "RULES" | "CATEGORY" | "OPTION" | "RULES" | "INVITE" | "FORM" | "SUCCESS_MESSAGE";
interface IProps {
    // Properties for the name of the challenge.
    name: string;
    setName: (newName: string) => void;

    // Properties for the option of the challenge.
    option: string;
    setOption: (newOption: string) => void;

    // Properties for the category of the challenge.
    category: string;
    setCategory: (newCategory: string) => void;

    // Properties for the description of the challenge.
    description: string;
    setDescription: (newDescription: string) => void;

    // Properties for the invite code of the challenge.
    invite: string;
    setInvite: (newInvite: string) => void;

    // Properties for the video of the challenge.
    video: File;
    prewiewVideo: string;
    setVideo: (newVideo: File) => void;

    // Properties for the video of the challenge.
    step: StepType;
    setStep: (step: StepType) => void;

    // Handle submit function
    handleSubmit: () => void;

    //error message property;
    errorMessage: string;
    loading: boolean;
}

// useChallengeCreate is a hook that provides properties and functions for creating a challenge.
export const useChallengeCreate = create<IProps>((set, get) => ({
    errorMessage: "",
    loading: false,
    // Properties for the name of the challenge.
    name: "",
    setName: (newName) => {
        set({ name: newName });
    },

    // Properties for the category of the challenge.
    option: "",
    setOption: (newOption) => set(() => ({ option: newOption })),

    // Properties for the category of the challenge.
    category: "",
    setCategory: (newCategory) => set(() => ({ category: newCategory })),

    // Properties for the description of the challenge.
    description: "",
    setDescription: (newDescription) => set(() => ({ description: newDescription })),

    // Properties for the invite code of the challenge.
    invite: "",
    setInvite: (newInvite) => set(() => ({ invite: newInvite })),

    // Properties for the video of the challenge.
    video: null,
    prewiewVideo: "",
    setVideo: (newVideo) => {
        set(() => ({ video: newVideo, prewiewVideo: URL.createObjectURL(newVideo) }));
    },

    // Properties for the current step of the creation process.
    step: "RULES",
    setStep: async (newStep) => {
        const { category, step, option, name, prewiewVideo, description, video, invite } = get();
        if (step === "RULES") {
            set({ step: newStep });
        } else if (step === "CATEGORY" && !category) {
            set({ errorMessage: "Please select category" });
        } else if (step === "OPTION" && !option) {
            set({ errorMessage: "Please select option" });
        } else if (step === "FORM") {
            if (name == "" || description == "" || prewiewVideo == "") {
                set({ errorMessage: "Please Fill the values" });
            } else {
                set({ step: newStep, errorMessage: "" });
            }
        } else if (step === "INVITE") {
            if (name !== "" && description !== "" && prewiewVideo !== "") {
                set({ loading: true });
                const formdata = new FormData();
                formdata.append("name", name);
                formdata.append("description", description);
                formdata.append("category", option);
                formdata.append("file", video);
                formdata.append("inviteUserId", invite);
                try {
                    await ChallengeService.create(formdata);
                    set(() => ({ step: newStep, errorMessage: "", loading: false }));
                } catch (error) {
                    console.log({ error });
                    showToastError(error.response.data.message);
                    set({ errorMessage: error?.message, loading: false });
                }
            } else {
                set({ errorMessage: "ALl Fields are required please fill" });
            }
        } else {
            set({ step: newStep, errorMessage: "" });
        }
    },

    // Function for submitting the challenge.
    handleSubmit: () => {},
}));
