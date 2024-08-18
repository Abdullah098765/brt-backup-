"use client";
import { useState } from "react";
import LetsGo from "./ChallengeForm/LetGo";
import Details from "./ChallengeForm/Details";
import UploadVideo from "./ChallengeForm/UploadVideo";
import Summary from "./ChallengeForm/Summary";
import InviteFriend from "./ChallengeForm/InviteFriend";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChallengeStore } from "../../state/useChallengeStore";

//categories for challenge
const categoryOptions = ["Game", "Cartoon", "Gym"];

const challengeSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    category: yup.string().oneOf(categoryOptions).default("Game"),
});

const AddChallengesModal = () => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const { createChallenge } = useChallengeStore();
    //form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(challengeSchema),
    });
    console.log({ errors });
    //submit function
    const onSubmit = (data) => {
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("description", data.description);
        formdata.append("category", data.category);
        formdata.append("file", file);
        formdata.append("inviteUserId", "66465a2c90d6237a12d5f56b");

        // createChallenge(formdata);
    };

    //return component
    let component = <LetsGo handleNext={setStep} />;
    if (step === 2) {
        component = (
            <Details
                handleNext={setStep}
                handleBack={setStep}
                register={register}
            />
        );
    }
    if (step === 3) {
        component = <UploadVideo setValue={setFile} />;
    }
    if (step === 4) {
        component = <InviteFriend />;
    }
    if (step === 5) {
        component = <Summary />;
    }
    console.log("NAME", watch("video"));
    const step1Validation = () => {
        const name = watch("name");
        const description = watch("description");
        const category = watch("category");
        if (name == "" || description == "" || category == "") {
            return false;
        } else {
            return true;
        }
    };
    const handleNext = () => {
        if (!step1Validation()) {
            return;
        }
        setStep(step + 1);
    };
    const handleBack = () => {
        setStep(step - 1);
    };
    console.log({ step });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3">
            {component}
            {step === 1 ? null : (
                <div className="flex justify-between items-center mt-3">
                    <button
                        type="button"
                        className="btn btn-active"
                        onClick={handleBack}>
                        Back
                    </button>
                    {step === 6 ? (
                        <button
                            type="submit"
                            className="btn bg-primary-content">
                            Submit
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn bg-primary-content"
                            onClick={handleNext}>
                            Next
                        </button>
                    )}
                </div>
            )}
        </form>
    );
};

export default AddChallengesModal;
