import { memo, useState } from "react";
import { useUserStore } from "../../state/useUserStore";

function UploadImage() {
    const [imageUploading, setImageUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const { setProfileImage, user } = useUserStore();
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUploading(true);
            try {
                await setProfileImage(file);
                setImageUploading(false);
            } catch (error) {
                console.error("Error uploading the image to Firebase Storage:", error);
                // Handle error here
            }
        }
    };
    return (
        <div className="flex items-center  md:justify-center sm:justify-center">
            <label
                htmlFor="file-input"
                className="avatar-input flex flex-col items-center">
                {imageUploading ? (
                    <>
                        <div className="animate-spin rounded-full w-[120px] h-[120px]  mx-4 border-t-2 border-b-2 border-[#fff]"></div>
                    </>
                ) : (
                    <img
                        src={selectedImage ? URL.createObjectURL(selectedImage) : user?.picture}
                        className="w-[120px] h-[120px] rounded-full mx-4 border-2 border-gray-500 transition duration-300 object-cover cursor-pointer"
                        alt={user?.displayName}
                        key={new Date().getTime()}
                        style={{
                            transition: "transform 0.2s",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                        }}
                    />
                )}
                <label className="text-gray-600 dark:text-gray-400">Profile Picture</label>

                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input hidden"
                />
            </label>
        </div>
    );
}

export default memo(UploadImage);
