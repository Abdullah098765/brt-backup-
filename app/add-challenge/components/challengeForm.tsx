import { ICONS } from "../../../icons";
import { useChallengeCreate } from "../../../state/useChallengeForm";
import CommonModel from "./commonModel";

export default function ChallengeForm() {
    const { name, setName, description, setDescription, setVideo, prewiewVideo, setStep } = useChallengeCreate();

    return (
        <CommonModel
            title="Upload a video"
            desc=""
            buttonText="Next"
            onClick={() => setStep("INVITE")}>
            <div className="">
                <label className="text-sm">Name</label>
                <input
                    className="input mb-4"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="text-sm">Description</label>
                <textarea
                    className="textarea mb-4"
                    placeholder="Description"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {prewiewVideo ? (
                    <video
                        src={prewiewVideo}
                        className="h-24  w-full object-cover rounded-2xl"
                    />
                ) : (
                    <>
                        <label
                            htmlFor="file"
                            className="bg-white/10 w-full flex rounded-2xl p-4 py-9 justify-center items-center gap-4">
                            <span>{ICONS["UPLOAD"].Icon}</span>
                            <span className="text-lg">Upload video</span>
                        </label>
                        <input
                            className="hidden"
                            id="file"
                            type="file"
                            accept="video/*"
                            onChange={(e) => {
                                let file = e.target.files[0];
                                if (file) {
                                    setVideo(file);
                                }
                            }}
                        />
                    </>
                )}
            </div>
        </CommonModel>
    );
}
