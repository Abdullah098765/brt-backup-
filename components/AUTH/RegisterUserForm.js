"use client";
import useAuth from "../../hooks/useAuth";
import { useMobile } from "../../hooks/useMobile";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useState } from "react";
import logo from "../../../public/assets/logo.png";
import { auth } from "../../../firebaseConfig";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Select, SelectItem } from "@nextui-org/react";
import countries from "../../JSON/countries.json";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useUserStore } from "../../state/useUserStore";
import UploadImage from "./uploadImage";
const variants = {
    hidden: { opacity: 0, x: "75px" },
    visible: { opacity: 1, x: 0 },
};
export default function RegisterUserForm() {
    const isMobile = useMobile();
    const { user, updateUser } = useUserStore();
    console.log({ user });
    const [currentUser, loading] = useAuthState(auth);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const pathName = usePathname();
    const [isProcessing, setIsProcessing] = useState(false);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        dateofbirth: "",
        gender: "",
        bragname: "",
        email: "",
        phone: "",
        country: "",
        bio: "",
        school: "",
        interests: [],
    });

    const [isContinueDisabled, setIsContinueDisabled] = useState(true);

    const [inputErrorMessages, setInputErrorMessages] = useState({
        firstname: null,
        lastname: null,
        age: null,
        gender: null,
        bragname: null,
        email: null,
        phone: null,
        country: null,
        bio: null,
        school: null,
        interests: null,
    });
    useEffect(() => {
        // async function checkBragname() {
        //     const isBragNameNotAvailable = await getUserByUsernameOrEmail(formData.bragname);
        //     if (isBragNameNotAvailable && isBragNameNotAvailable !== user?.email) {
        //         setInputErrorMessages((prevFormData) => ({
        //             ...prevFormData,
        //             bragname: formData.bragname + " is not available",
        //         }));
        //         console.log(isBragNameNotAvailable);
        //     } else {
        //         setInputErrorMessages((prevFormData) => ({
        //             ...prevFormData,
        //             bragname: null,
        //         }));
        //     }
        // }
        // checkBragname();
        if (step == 1) {
            if (!formData?.bragname?.trim() || !formData?.country?.trim() || !formData.dateofbirth?.toString()?.trim() || !formData.gender?.trim()) {
                console.log("Invailid form Data step == 1");
                setIsContinueDisabled(true);
            } else {
                setIsContinueDisabled(false);
            }
        }
        if (step == 2) {
            console.log(formData.interests);
            if (
                formData.picture ==
                    "https://firebasestorage.googleapis.com/v0/b/bragtime-d87ef.appspot.com/o/profilePic%2FProfilePictureUploadersd.jpg?alt=media&token=5bdb3f47-f110-4ae4-9ff9-c2841d27db00" ||
                !formData.bio?.trim() ||
                formData.interests?.length == 0
            ) {
                setIsContinueDisabled(true);
            } else {
                setIsContinueDisabled(false);
            }
        }
        console.log(formData);
    }, [formData, step]);

    console.log({ formData });

    useEffect(() => {
        if (currentUser) {
            const nameParts = currentUser.displayName.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");

            setFormData((prevFormData) => ({
                ...prevFormData,
                firstname: firstName,
                lastname: lastName,
                email: currentUser.email,
                country: user?.country,
                bragname: user?.bragname,
                dateofbirth: user?.dateofbirth,
                gender: user?.gender,
                phone: user?.phone,
                school: user?.school,
                interests: user?.interests,
                bio: user?.bio,
            }));
        }
    }, [currentUser, user]);

    console.log({ formData });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        const hasSpecialChars = /[<>/?!=$]/.test(value);
        if (hasSpecialChars) {
            setInputErrorMessages((prevFormData) => ({
                ...prevFormData,
                [name]: "<>/?!=$ characters are not allowed",
            }));
            return;
        }

        if (value || !value.toString().trim() === "") {
            if (name !== "bragname") {
                setInputErrorMessages((prevFormData) => ({
                    ...prevFormData,
                    [name]: null,
                }));
            }
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value.toString(),
        }));
    };

    const continue1 = () => {
        if (formData.age < 18) {
            setInputErrorMessages((prevFormData) => ({
                ...prevFormData,
                age: "Age must be older than 18",
            }));
            return;
        }
        if (inputErrorMessages.bragname) {
            setIsContinueDisabled(true);
            return;
        } else setIsContinueDisabled(false);

        setStep(2);
        setIsContinueDisabled(true);
        return;
    };
    const continue2 = () => {
        if (formData.bio.length < 15) {
            setInputErrorMessages((prevFormData) => ({
                ...prevFormData,
                bio: "Bio must be longer than 15 characters.",
            }));
            return;
        }

        handleSubmit();

        return;
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // const origin = window.location.origin;
        setIsProcessing(true);
        // const userEmailForCheckingAvailability = await getUserByUsernameOrEmail(formData.bragname);

        // console.log(formData.picture);

        // if (userEmailForCheckingAvailability) {
        //     //   setErrorMessage("This user does not exist");
        //     //   setIsLoggingIn(false);
        //     if (userEmailForCheckingAvailability !== currentUser?.email) {
        //         setIsProcessing(false);
        //         alert("bragname is not available!");

        //         return;
        //     }
        // }
        try {
            await updateUser(formData);
            setIsProcessing(false);

            // window.location = origin + "/home?movedLevel1=true";
        } catch (error) {
            console.error("Error:", error);
            setIsProcessing(false);
        }
        console.log(pathName);
    };
    const isSelected = (interest) => formData?.interests?.includes(interest);

    const optionStyle = (interest) => {
        return isSelected(interest)
            ? {
                  borderRadius: 0,
                  backgroundColor: "#1f2937",
                  width: "100%",
                  color: "white",
                  borderBottom: "2px solid #10b981",
              }
            : {
                  backgroundColor: "#332668",
                  width: "100%",
                  color: "white",
                  borderRadius: 0,
              };
    };
    //
    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
        apiKey: "AIzaSyAts-gQ9Thwu3s-I4cLOHOzyaOEBLx6phg",
        placeholder: "Enter School",
        options: {
            types: ["school", "secondary_school", "university"],
        },
    });
    const [isPredictionsVisible, setIsPredictionsVisible] = useState(false);

    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length)
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (placeDetails) => console.log(placeDetails)
            );
    }, [placePredictions]);
    //
    const formatPhoneNumber = (rawPhoneNumber) => {
        const numericPhoneNumber = rawPhoneNumber.replace(/\D/g, "");
        if (numericPhoneNumber.length === 10) {
            return `(${numericPhoneNumber.substring(0, 3)}) ${numericPhoneNumber.substring(3, 6)}-${numericPhoneNumber.substring(6)}`;
        } else {
            return rawPhoneNumber;
        }
    };
    return (
        <div className={`flex flex-col items-center text-center ${pathName !== "/home" && "mdl:px-44"}   w-full h-full mt-4 z-50`}>
            <div className="flex items-center justify-between space-x-2 w-full text-center ">
                {step == 2 ? (
                    <FaArrowAltCircleLeft
                        onClick={() => setStep(1)}
                        className="w-10 h-10  text-gray-500 hover:text-gray-600"
                    />
                ) : (
                    <div />
                )}
                <div className="flex flex-row">
                    <Image
                        src={logo}
                        width={35}
                        height={35}
                        alt="logo"
                        className="w-7 h-7 rounded-full object-cover"
                    />
                    <h1 className="white-text text-xl">Bragtime</h1>
                </div>
                <p>{null}</p>
            </div>

            <h1 className="mb-1 mt-4 text-white font-semibold text-center text-2xl md:text-4xl">{formData.bragname ? `Welcome ${formData.bragname}` : "Welcome! Please select a unique Bragname"}</h1>

            {pathName !== "/home" && (
                <>
                    {!isMobile ? (
                        <p className="mb-1 main-text text-lg mdl:text-[15px] text-center mt-w text-white">Complete Profile and start participating in challenges</p>
                    ) : (
                        <p className="mb-1 main-text text-lg mdl:text-[18px] text-center">Complete Profile and start participating in challenges</p>
                    )}
                </>
            )}
            <>
                <div className="w-full h-full">
                    {step == 1 && (
                        <motion.div
                            id="step1"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            <div className="flex flex-col mdl:flex-row  mdl:space-x-4 my-1 w-full h-full px-3 mdl:px-0">
                                <div className="flex flex-col w-full  mdl:w-1/2">
                                    <label className={`${!inputErrorMessages.firstname ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span>{!inputErrorMessages.firstname ? "First Name:" : "This field is required!"}</span>
                                    </label>
                                    <input
                                        disabled
                                        id="firstname"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
                                                       ${!inputErrorMessages?.firstname ? "border-none" : "border-[3px] border-red-600"}`}
                                        placeholder="Your first Name"
                                    />
                                </div>
                                <div className="flex flex-col w-full  mdl:w-1/2">
                                    <label className={`${!inputErrorMessages.lastname ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span>{!inputErrorMessages.lastname ? "Last Name:" : "This field is required!"}</span>
                                    </label>
                                    <input
                                        disabled
                                        id="lastname"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
                                                       ${!inputErrorMessages?.lastname ? "border-none" : "border-[3px] border-red-600"}`}
                                        placeholder="Your last Name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mdl:flex-row  mdl:space-x-4 my-1 w-full h-full px-3 mdl:px-0">
                                <div className="flex flex-col w-full  mdl:w-1/2 relative">
                                    {" "}
                                    <label className={`${!inputErrorMessages.bragname ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span className="flex flex-row">{!inputErrorMessages.bragname ? "Bragname:" : inputErrorMessages.bragname} </span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            id="bragname"
                                            name="bragname"
                                            value={formData.bragname}
                                            onChange={(e) => {
                                                let evt = { target: { value: e.target.value.toLocaleLowerCase(), name: "bragname" } };
                                                handleChange(evt);
                                            }}
                                            className={`w-full h-14 bg-white rounded-lg pl-6 text-lg ${user?.bragname !== "" ? "cursor-not-allowed" : ""} ${
                                                !inputErrorMessages.bragname ? "border-none" : "border-[3px] border-red-600"
                                            }
            `}
                                            placeholder="Bragname"
                                        />
                                        {!inputErrorMessages.bragname && formData.bragname && (
                                            <div className="absolute right-2 top-[3.5rem] transform -translate-y-1/2">
                                                {formData?.bragname?.length <= 3 ? (
                                                    <svg
                                                        version="1.1"
                                                        id="loader-1"
                                                        x="0px"
                                                        y="0px"
                                                        width="35px"
                                                        height="35px"
                                                        viewBox="0 0 40 40"
                                                        enable-background="new 0 0 40 40">
                                                        <path
                                                            opacity="0.2"
                                                            fill="#000"
                                                            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                                                        />
                                                        <path
                                                            fill="#000"
                                                            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                                                            <animateTransform
                                                                attributeType="xml"
                                                                attributeName="transform"
                                                                type="rotate"
                                                                from="0 20 20"
                                                                to="360 20 20"
                                                                dur="0.9s"
                                                                repeatCount="indefinite"
                                                            />
                                                        </path>
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        class="checkmark"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 52 52">
                                                        <circle
                                                            class="checkmark__circle"
                                                            cx="26"
                                                            cy="26"
                                                            r="25"
                                                            fill="none"
                                                        />
                                                        <path
                                                            class="checkmark__check"
                                                            fill="none"
                                                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                                        />
                                                    </svg>
                                                )}{" "}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col w-full  mdl:w-1/2 relative">
                                    <label className={`${!inputErrorMessages.gender ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span>{!inputErrorMessages.gender ? "Gender:" : inputErrorMessages.gender}</span>
                                    </label>
                                    <select
                                        value={formData.gender}
                                        isRequired
                                        label="Select gender"
                                        name="gender"
                                        placeholder="Select gender"
                                        onChange={handleChange}
                                        defaultSelectedKeys={["Male"]}
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
             ${!inputErrorMessages?.gender ? "border-none" : "border-[3px] border-red-600"}`}>
                                        <option
                                            disabled
                                            selected
                                            value="">
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col mdl:flex-row  mdl:space-x-4 my-1 w-full h-full px-3 mdl:px-0">
                                <div className="flex flex-col w-full  mdl:w-1/2">
                                    <label className={`${!inputErrorMessages.dateofbirth ? "white-text" : "text-red-600 font-semibold"}  text-base mdl:text-lg w-full text-start`}>
                                        <span>{!inputErrorMessages.dateofbirth ? "Date of birth:" : inputErrorMessages.dateofbirth}</span>
                                    </label>
                                    <input
                                        id="dateofbirth"
                                        name="dateofbirth"
                                        type="date"
                                        value={formData.dateofbirth}
                                        onChange={handleChange}
                                        placeholder="Must be at least 18"
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
                                                       ${!inputErrorMessages?.dateofbirth ? "border-none" : "border-[3px] border-red-600"}`}
                                    />
                                </div>
                                <div className="flex flex-col w-full  mdl:w-1/2">
                                    <label className={`${!inputErrorMessages.phone ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                        <span>{!inputErrorMessages.phone ? "Phone Number (Optional)" : "Phone Number is rquired"}</span>
                                    </label>
                                    <input
                                        maxLength={15}
                                        className={`w-full h-14 bg-white rounded-lg pl-6 text-lg
                                                       ${!inputErrorMessages?.phone ? "border-none" : "border-[3px] border-red-600"}`}
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="Phone Number"
                                        onChange={(e) => {
                                            const isValidNumber = /^[\d ()-]*$/.test(e.target.value);
                                            if (isValidNumber) {
                                                let evt = { target: { value: formatPhoneNumber(e.target.value), name: "phone" } };

                                                handleChange(evt);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col text-left my-1 w-full h-full px-3 mdl:px-0"></div>

                            <div className="flex flex-col w-full">
                                <label className={`${!inputErrorMessages.country ? "white-text text-start" : "text-red-600 text-start font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                    <span>{!inputErrorMessages.country ? "Country:" : inputErrorMessages.country}</span>
                                </label>
                                <select
                                    placeholder="Choose country"
                                    onChange={(va) => setFormData({ ...formData, country: va.target.value })}
                                    className={`w-full h-14 bg-white rounded-lg pl-6 text-lg ${!inputErrorMessages?.country ? "border-none" : "border-[3px] border-red-600"}`}
                                    name="country">
                                    <option
                                        disabled
                                        value="">
                                        Select Country
                                    </option>
                                    {countries.map((country) => (
                                        <option value={country.name}>{country.name}</option>
                                    ))}
                                </select>
                                {/* <Autocomplete
                                    className={`w-full h-14 bg-white rounded-lg pl-6 text-lg ${!inputErrorMessages?.country ? "border-none" : "border-[3px] border-red-600"}`}
                                    placeholder="Your Country"
                                    value={formData.country}
                                    options={{
                                        types: ["country"],
                                    }}
                                    apiKey="AIzaSyAts-gQ9Thwu3s-I4cLOHOzyaOEBLx6phg"
                                    onPlaceSelected={(place) => {
                                        console.log(place?.address_components[0].long_name);
                                        if (place?.address_components[0].long_name) {
                                            let e = { target: { value: place?.address_components[0].long_name, name: "country" } };
                                            handleChange(e);
                                        }
                                    }}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        handleChange(e);
                                    }}
                                    name={"country"}
                                /> */}
                            </div>
                        </motion.div>
                    )}

                    {step == 2 && (
                        <motion.div
                            id="step2"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden">
                            <div className="flex flex-col text-left my-1 w-full h-full px-3 mdl:px-0"></div>
                            <div className="flex flex-col text-left my-1 w-full px-3 mdl:px-0">
                                <UploadImage />
                                <div className="flex flex-col mdl:flex-row  mdl:space-x-4 my-1 w-full h-full px-3 mdl:px-0">
                                    <div className="flex flex-col w-full  mdl:w-1/2">
                                        <label className={`${true ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                            <span>{true ? " School (Optional)" : inputErrorMessages.school}</span>
                                        </label>
                                        <>
                                            <input
                                                className={`w-full h-14 bg-white rounded-lg pl-6 text-lg ${true ? "border-none" : "border-[3px] border-red-600"}`}
                                                placeholder="Enter School"
                                                onChange={(evt) => {
                                                    getPlacePredictions({ input: evt.target.value });
                                                    console.log(evt.target.value);

                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        school: evt.target.value,
                                                    }));
                                                    setIsPredictionsVisible(true);
                                                }}
                                                value={formData.school}
                                                loading={isPlacePredictionsLoading}
                                            />
                                            {isPredictionsVisible && (
                                                <div className="absolute z-50 top-[56%] w-[30%] overflow-hidden">
                                                    {placePredictions.map((item) => (
                                                        <p
                                                            style={{
                                                                borderRadius: 0,
                                                                width: "100%",
                                                                color: "white",
                                                                borderBottom: "2px solid #10b981",

                                                                whiteSpace: "nowrap",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                            onClick={() => {
                                                                setFormData((prevFormData) => ({
                                                                    ...prevFormData,
                                                                    school: item.description,
                                                                }));
                                                                setIsPredictionsVisible(false);
                                                            }}
                                                            className="py-2 px-2 bg-[#1f2937] hover:bg-gray-900">
                                                            {item.description}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    </div>
                                    <div className="flex flex-col w-full  mdl:w-1/2">
                                        <label className={`${!inputErrorMessages.interests ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full text-start`}>
                                            <span>{!inputErrorMessages.interests ? "Interests:" : inputErrorMessages.interests}</span>
                                        </label>
                                        <Select
                                            placeholder="Select at least one interest"
                                            selectionMode="multiple"
                                            selectedKeys={formData.interests}
                                            className={`w-full h-14 bg-white rounded-lg pl-6 text-lg ${!inputErrorMessages.interests ? "border-none" : "border-[3px] border-red-600"}`}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                const selectedInterests = e.target.value.split(",").filter((interest) => interest !== "");
                                                setFormData({
                                                    ...formData,
                                                    interests: selectedInterests,
                                                });
                                            }}>
                                            {["Hiking", "Gym", "Gaming", "Movies"].map((interest) => (
                                                <SelectItem
                                                    style={optionStyle(interest)}
                                                    key={interest}
                                                    value={interest}
                                                    className="bg-white hover:bg-gray-100 text-gray-900 cursor-pointer py-2 rounded-lg">
                                                    {interest}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>

                                <label className={`${!inputErrorMessages.bio ? "white-text" : "text-red-600 font-semibold"} text-base mdl:text-lg w-full flex flex-row justify-between`}>
                                    <span>{!inputErrorMessages.bio ? " Profile Bio:" : inputErrorMessages.bio}</span>
                                    <span className="text-gray-300 text-sm">{formData?.bio?.length}/400</span>
                                </label>
                                <textarea
                                    maxLength={400}
                                    minLength={15}
                                    className={`w-full h-14 bg-white rounded-lg pl-6 text-lg${!inputErrorMessages?.bio ? "border-none" : "border-[3px] border-red-600"}`}
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    placeholder="Enter bio ..."
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        id="step3"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden">
                        <div className="flex flex-col text-left my-1 w-full px-3 mdl:px-0 relative">
                            {pathName === "/home" && <div className="p-3"></div>}
                            <button
                                disabled={isContinueDisabled}
                                onClick={() => {
                                    if (step === 1) {
                                        continue1();
                                    } else if (step === 2) {
                                        continue2();
                                    } else {
                                        // continue3();
                                    }
                                }}
                                className={` py-4 white-text rounded-lg my-1 border border-[#ccc]  px-3 mdl:px-0 ${
                                    isContinueDisabled ? "bg-[gray] cursor-not-allowed" : "btn-purp hover:brightness-125"
                                }`}>
                                {isProcessing ? "Processing..." : "Continue"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </>
        </div>
    );
}
