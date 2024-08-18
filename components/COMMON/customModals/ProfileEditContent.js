import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { TabPanel, Tabs, Tab, TabList } from "react-tabs";
import profilepic from "../../../public/images/profile-1.jpeg";
import "react-tabs/style/react-tabs.css";
import dynamic from "next/dynamic";
import { imageUrl } from "../../../utils/url";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import _get from "lodash/get";
import _has from "lodash/has";
import _eq from "lodash/eq";
import _reverse from "lodash/reverse";
import _truncate from "lodash/truncate";
import GooglePlacesAutocomplete, { geocodeByAddress } from "react-google-places-autocomplete";
import { useAddressAbbreviation, useFromAddressAbbreviation } from "../../../Hooks/useAddressAbbreviation";
import { setAllInputFields, setDescription, setFirstName, setLastName, setPronouns, setAge, setGender } from "../../../redux/inputSlice";
import Card from "react-credit-cards";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { updateUserProfileObject, updateUserProfiles } from "../../../redux/authUserSlice";
import { FaCreditCard, FaLandmark, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "./utils";
import { createActivities } from "../../../redux/activity";

const UserImage = dynamic(() => import("../UserImage"), {
    ssr: false,
});

const ProfileEditContent = (props) => {
    // const dispatch = useDispatch();
    const router = useRouter();
    const [isAddDescription, setIsAddDescription] = useState(false);
    const [isAddName, setIsAddName] = useState(false);
    const [liveAddress, setLiveAddress] = useState(false);
    const [fromAddress, setFromAddress] = useState(false);
    const [isBank, setIsBank] = useState(false);
    const [isCard, setIsCard] = useState(false);
    const [isPronouns, setIsPronouns] = useState(false);
    const [isEducation, setIsEducation] = useState(false);
    const [isAddAge, setIsAddAge] = useState(false);
    const [education, setEducation] = useState({});
    const [isAddGender, setIsAddGender] = useState(false);
    // const [gender,setGender] = useState("Male");
    const [visaCard, setVisaCard] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        issuer: "",
        focused: "",
        formData: null,
        loading: false,
    });
    const [bankAccount, setBankAccount] = useState({
        bankName: "",
        bankAccountNumber: "",
        bankRoutingNumber: "",
        swiftCode: "",
        error: {},
        loading: false,
    });
    const [address, setAddress] = useState({
        city: "",
        state: "",
        country: "",
    });
    const [loadingState, setLoadingState] = useState({
        type: "picture",
        loading: false,
    });

    const formRef = useRef(null);
    const { description, firstName, lastName, pronouns, age, gender } = props;

    const isCurrentUser = useMemo(() => {
        if (profile?.username === router?.query?.slug) {
            return true;
        }
    }, [profile?.username, router?.query?.slug]);

    useEffect(() => {
        if (isCurrentUser) {
            dispatch(setAllInputFields({ ...profile }));
        }
    }, []);

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setVisaCard({ ...visaCard, issuer });
        }
    };

    const handleInputFocus = ({ target }) => {
        setVisaCard({ ...visaCard, focused: target.name });
    };

    const handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        setVisaCard({ ...visaCard, [target.name]: target.value });
    };
    const validateAccountNumber = (value) => {
        const accountNumberPattern = /^\d{1,17}$/;
        return accountNumberPattern.test(value);
    };

    const validateRoutingNumber = (value) => {
        const routingNumberPattern = /^\d{9}$/;
        return routingNumberPattern.test(value);
    };
    const handleBankInputChange = ({ target }) => {
        const errors = {};
        if (target.name === "bankAccountNumber") {
            target.value = target.value;
            errors.bankAccountNumber = validateAccountNumber(target.value) ? "" : "Please enter a valid account number";
        } else if (target.name === "bankRoutingNumber") {
            target.value = target.value;
            errors.bankRoutingNumber = validateRoutingNumber(target.value) ? "" : "Please enter a valid routing number";
        } else if (target.name === "bankName") {
            target.value = target.value;
        } else if (target.name === "swiftCode") {
            target.value = target.value;
        }
        setBankAccount({
            ...bankAccount,
            [target.name]: target.value,
            error: errors,
        });
    };
    const handleSubmitAddCard = (e) => {
        e.preventDefault();
        let params = {
            cardHolderName: visaCard.name,
            cardNo: visaCard.number,
            expireDate: visaCard.expiry,
            cvc: visaCard.cvc,
        };
        setVisaCard({ ...visaCard, loading: true });
        dispatch(updateUserProfiles({ defaultPayment: JSON.stringify(params) }))
            .unwrap()
            .then(() => {
                setIsCard(false);
                setVisaCard({
                    number: "",
                    name: "",
                    expiry: "",
                    cvc: "",
                    issuer: "",
                    focused: "",
                    formData: null,
                    loading: false,
                });
            });
        console.log({ params });
    };

    const handleSubmitBankAccount = () => {
        const errors = {};
        const accountNumberPattern = /^\d{1,17}$/; // Validate account number (1 to 17 digits)
        const routingNumberPattern = /^\d{9}$/; // Validate routing number (9 digits)

        if (!accountNumberPattern.test(bankAccount.bankAccountNumber)) {
            errors.bankAccountNumber = "Please enter a valid account number";
        }

        if (!routingNumberPattern.test(bankAccount.bankRoutingNumber)) {
            errors.bankRoutingNumber = "Please enter a valid routing number";
        }

        if (Object.keys(errors).length === 0) {
            // Submit the form or perform further actions
            setBankAccount({ ...bankAccount, loading: true });
            let params = {
                bankName: bankAccount.bankName,
                bankAccountNumber: bankAccount.bankAccountNumber,
                BankRoutingNumber: bankAccount.bankRoutingNumber,
                SwiftCode: bankAccount.swiftCode,
            };
            dispatch(updateUserProfiles(params))
                .unwrap()
                .then(() => {
                    setIsBank(false);
                });
        } else {
            setBankAccount({ ...bankAccount, error: errors });
        }
    };
    const handleAddEducation = () => {
        setIsEducation(!isEducation);
        if (isEducation) {
            let params = {
                education: JSON.stringify(education),
            };
            console.log({ params, education });
            dispatch(updateUserProfiles(params));
        }
    };
    const addressAbbreviation = useAddressAbbreviation(profile?.country, profile?.state);
    const fromAddressAbbreviation = useFromAddressAbbreviation(profile?.fromCountry, profile?.fromState);

    const handleAddDescription = () => {
        setIsAddDescription(!isAddDescription);
        if (isAddDescription) {
            let params = {
                description,
            };
            dispatch(updateUserProfiles(params));
        }
    };

    const handleAddAge = () => {
        setIsAddAge(!isAddAge);
        if (isAddAge) {
            let params = {
                age,
            };
            dispatch(updateUserProfiles(params));
        }
    };
    const handleAddName = () => {
        setIsAddName(!isAddName);
        if (isAddName) {
            let params = {
                firstName,
                lastName,
            };
            dispatch(updateUserProfiles(params));
        }
        setIsAddDescription(false);
    };
    const handleAddGender = () => {
        setIsAddGender(!isAddGender);
        if (isAddGender) {
            let params = {
                gender: gender,
            };
            dispatch(updateUserProfiles(params));
        }
        dispatch(setGender("male"));
    };
    const handleAddPronouns = () => {
        setIsPronouns(!isPronouns);
        if (isPronouns) {
            let params = {
                pronouns,
            };
            dispatch(updateUserProfiles(params));
        }
    };
    const handleActivity = (message) => {
        let activityParams = {
            table: "USER",
            action: "UPDATED",
            payload: JSON.stringify({
                payload: {
                    ...profile,
                    status: "INFO",
                    image: null,
                    message: message,
                },
            }),
        };
        dispatch(createActivities(activityParams));
    };
    const handleAddLocation = (type) => {
        if (type === "from") {
            if (!fromAddress) {
                setFromAddress(true);
            } else {
                let params = {
                    fromState: address.state,
                    fromCountry: address.country,
                    fromCity: address.city,
                };
                handleActivity("Hey there! You just update your from address");
                dispatch(updateUserProfiles(params));
                setFromAddress(false);
                setIsAddDescription(false);
                setIsAddName(false);
            }
        } else {
            if (!liveAddress) {
                setLiveAddress(true);
            } else {
                handleActivity("Hey there! You just update your to address");
                dispatch(updateUserProfiles(address));
                setLiveAddress(false);
                setIsAddDescription(false);
                setIsAddName(false);
            }
        }
    };

    const handleUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setLoadingState({
                type,
                loading: true,
            });
            dispatch(updateUserProfileObject({ file, type: type }))
                .unwrap()
                .then(() => {
                    setLoadingState({
                        type,
                        loading: false,
                    });
                });
        }
    };
    const getAddress = (newResult, type) => {
        if (!newResult) return;
        const index = newResult.address_components.findIndex((item) => item.types.includes(type));
        console.log({ index, newResult });
        const name = newResult.address_components[index].long_name;
        return name;
    };

    const tempDefaultPayment = JSON.parse(profile.defaultPayment);
    useEffect(() => {
        if (tempDefaultPayment) {
            setVisaCard({
                cvc: tempDefaultPayment?.cvc,
                expiry: tempDefaultPayment?.expireDate,
                name: tempDefaultPayment?.cardHolderName,
                number: tempDefaultPayment?.cardNo,
            });
        }
        setBankAccount({
            bankAccountNumber: profile?.bankAccountNumber,
            bankName: profile?.bankName,
            swiftCode: profile?.SwiftCode,
            bankRoutingNumber: profile?.BankRoutingNumber,
        });
        setAddress({
            city: profile?.city,
            state: profile?.state,
            country: profile?.country,
        });
    }, [profile]);

    const handleChange = (value, type) => {
        if (_eq(type, "education")) {
            let values = _reverse(value.value.terms);
            let city = values[1].value;
            let country = values[0].value;
            let newEdu = {
                schoolName: value.value.structured_formatting.main_text,
                schoolCity: city,
                schoolCountry: country,
                placeId: value.value.place_id,
                formatedAddress: value.value.description,
            };
            setEducation(newEdu);
        } else {
            geocodeByAddress(value.value.description)
                .then((result) => {
                    const newResult = result[0];
                    const country = getAddress(newResult, "country");
                    let city = getAddress(newResult, "locality");
                    if (!city) {
                        city = getAddress(newResult, "colloquial_area");
                    }
                    const state = getAddress(newResult, "administrative_area_level_1");
                    console.log({ country, city, state });
                    setAddress({ country, city, state });
                })

                .catch((error) => console.log({ error }));
        }
    };

    const isCardAdded = !!JSON.parse(profile.defaultPayment)?.cardNo;

    const formatCardNumber = (cardNumber) => {
        const visibleDigits = 4;
        const visiblePart = cardNumber?.slice(0, -visibleDigits)?.replace(/(.{4})/g, "$1-");
        const maskedNumber = visiblePart + "XXXX";
        return maskedNumber;
    };
    const maskedCardNumber = formatCardNumber(tempDefaultPayment?.cardNo);
    return (
        <div className="flex flex-col w-full h-auto px-3 py-2 justify-center text-left">
            <h1 className="text-center text-xl mdl:text-2xl mb-3 font-semibold">Edit profile</h1>
            <Tabs className="my-4">
                <TabList className="w-full h-10 flex justify-around items-center white-text">
                    <Tab className="clearwrapper !cursor-pointer px-4 py-2">Media</Tab>
                    <Tab className="clearwrapper !cursor-pointer px-4 py-2">About</Tab>
                    <Tab className="clearwrapper !cursor-pointer px-4 py-2">Account</Tab>
                </TabList>
                <TabPanel>
                    <div className="flex justify-between items-center my-4">
                        <h1 className="white-text text-left text-xl mdl:text-2xl">Profile picture</h1>

                        <div
                            className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full">
                            {loadingState.type === "picture" && loadingState.loading ? (
                                <div
                                    className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full bg-white animate-pulse"></div>
                            ) : (
                                <UserImage
                                    picture={profile?.picture}
                                    userID={profile?.id}
                                    onlineStatus={profile?.onlineStatus}
                                    width={60}
                                    height={60}
                                    gender={profile?.gender}
                                    alt="profile pic"
                                    className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full"
                                />
                            )}
                        </div>
                        <input
                            id="picture"
                            type="file"
                            className="hidden"
                            onChange={(e) => handleUpload(e, "picture")}
                        />
                        <label
                            htmlFor="picture"
                            className="btn-sq-light">
                            Edit
                        </label>
                    </div>
                    <div className="flex justify-between items-center my-6 relative">
                        <h1 className="white-text text-left text-xl mdl:text-2xl w-full">Profile banner</h1>
                        <div
                            className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[270px] mdl:h-[100px] mdl:min-w-[270px] mdl:min-h-[100px] 
                object-cover rounded-lg absolute top-12 left-20">
                            {loadingState.type === "banner" && loadingState.loading ? (
                                <div
                                    className="w-full h-44 max-h-44 object-cover rounded-t-xl w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                            mdl:w-[270px] mdl:h-[100px] mdl:min-w-[270px] mdl:min-h-[100px] 
                             object-cover rounded-lg bg-white animate-pulse"></div>
                            ) : (
                                <Image
                                    src={profile?.banner ? imageUrl(profile?.banner) : profilepic}
                                    width={200}
                                    height={100}
                                    alt="banner"
                                    style={{ objectFit: "cover" }}
                                    className="w-full h-44 max-h-44 object-cover rounded-t-xl w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
               mdl:w-[270px] mdl:h-[100px] mdl:min-w-[270px] mdl:min-h-[100px] 
                object-cover rounded-lg mdl:ml-12"
                                />
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            id="banner"
                            onChange={(e) => handleUpload(e, "banner")}
                        />
                        <label
                            htmlFor="banner"
                            className="btn-sq-light ">
                            Edit
                        </label>
                    </div>
                    <div className="flex justify-between items-center mt-40">
                        <h1 className="white-text text-left text-xl mdl:text-2xl flex flex-col">Avatars</h1>

                        <div
                            className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}>
                            <Image
                                src={profilepic}
                                width={70}
                                height={70}
                                alt="profile pic"
                                className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}
                            />
                        </div>
                        <div
                            className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}>
                            <Image
                                src={profilepic}
                                width={70}
                                height={70}
                                alt="profile pic"
                                className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}
                            />
                        </div>
                        <div
                            className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}>
                            <Image
                                src={profilepic}
                                width={70}
                                height={70}
                                alt="profile pic"
                                className={`w-[50px] h-[50px] min-w-[50px] min-h-[50px] 
                mdl:w-[70px] mdl:h-[70px] mdl:min-w-[70px] mdl:min-h-[70px] 
                object-cover rounded-full ${profile?.level < 3 ? "opacity-40" : ""}`}
                            />
                        </div>
                        <button
                            className={`btn-sq-light 
                        ${profile?.level < 3 ? "opacity-30 disabled !cursor-none" : "opacity-100 !cursor-pointer"}`}>
                            Edit
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="white-text text-left"></h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="white-text text-left"></h1>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col mt-6">
                        <div className="w-full flex justify-between">
                            <h1 className="white-text text-left text-lg mdl:text-xl">BIO</h1>
                            <div className="w-72 max-w-72 text-left main-text text-base mdl:text-lg ml-16">{profile?.description || "Describe yourself. Let them know why you're bragging"}</div>
                            <button
                                onClick={handleAddDescription}
                                className={`${isAddDescription ? "btn-sq green-bg" : "btn-sq-light"} max-h-10`}>
                                {isAddDescription ? "Save" : profile?.description ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isAddDescription && (
                            <div className="flex mt-10">
                                <p className="white-text text-base">Add Description</p>
                                <textarea
                                    className="textarea"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => dispatch(setDescription(e.target.value))}
                                />
                            </div>
                        )}

                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">Full Name</h1>
                            <h3 className="main-text text-left text-lg mdl:text-xl capitalize">
                                {profile?.firstName && profile?.lastName ? profile?.firstName + " " + profile?.lastName : "Your first and last name"}
                            </h3>
                            <button
                                onClick={() => {
                                    handleAddName();
                                    setLiveAddress(false);
                                    setFromAddress(false);
                                }}
                                className={`${isAddName ? "btn-sq green-bg" : "btn-sq-light"}`}>
                                {isAddName ? "Save" : profile?.firstName + profile?.lastName ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isAddName && (
                            <div className="flex mt-10 justify-between items-center">
                                <p className="white-text text-lg mdl:text-xl w-full">Add Name</p>
                                <input
                                    className="input  mr-2"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                                />
                                <input
                                    className="input"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => dispatch(setLastName(e.target.value))}
                                />
                            </div>
                        )}
                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">Age</h1>
                            <h3 className="main-text text-left text-lg mdl:text-xl">{profile?.age || "Your age"}</h3>
                            <button
                                onClick={handleAddAge}
                                className={`${isAddAge ? "btn-sq green-bg" : "btn-sq-light"} max-h-10`}>
                                {isAddAge ? "Save" : profile?.age ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isAddAge && (
                            <div className="flex mt-10 w-full">
                                <p className="white-text text-base w-full">Add Age</p>
                                <input
                                    className="input"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => dispatch(setAge(e.target.value))}
                                />
                            </div>
                        )}
                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">Gender</h1>
                            <h3 className="main-text text-left text-lg mdl:text-xl capitalize">{profile?.gender || "Gender"}</h3>
                            <button
                                onClick={handleAddGender}
                                className={`${isAddAge ? "btn-sq green-bg" : "btn-sq-light"} max-h-10`}>
                                {isAddAge ? "Save" : profile?.gender ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isAddGender && (
                            <div className="flex mt-10 w-full">
                                <p className="white-text text-base w-full">Add Age</p>
                                <select onChange={(e) => dispatch(setGender(e.target.value))}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        )}

                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">Pronouns</h1>
                            <h3 className="main-text text-left text-lg mdl:text-xl">{_get(profile, "pronouns", "Your pronouns")}</h3>
                            <button
                                onClick={() => {
                                    handleAddPronouns();
                                    setLiveAddress(false);
                                    setFromAddress(false);
                                }}
                                className={`${isPronouns ? "btn-sq green-bg" : "btn-sq-light"}`}>
                                {isPronouns ? "Save" : profile.pronouns ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isPronouns && (
                            <div className="flex mt-10 justify-between items-center">
                                <p className="white-text text-lg mdl:text-xl w-full">Add Pronouns</p>
                                <input
                                    className="input"
                                    placeholder="Pronouns"
                                    value={pronouns}
                                    onChange={(e) => dispatch(setPronouns(e.target.value))}
                                />
                            </div>
                        )}
                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">Lives in</h1>
                            {!liveAddress && (
                                <p className="main-text text-lg mdl:text-xl">
                                    {profile?.city}
                                    {", "}
                                    {addressAbbreviation}
                                </p>
                            )}
                            <button
                                onClick={() => {
                                    handleAddLocation("live");
                                    setIsAddName(false);
                                    setFromAddress(false);
                                }}
                                className={`${liveAddress ? "btn-sq green-bg" : "btn-sq-light"}`}>
                                {liveAddress ? "Save" : profile?.city ? "Edit" : "Add"}
                            </button>
                        </div>
                        {liveAddress && (
                            <div className="flex mt-10 justify-between items-center">
                                <p className="white-text text-base w-full">Where do you live</p>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyDaxOlDfZZ5r2JtNn0mxnBWpaqGQAsFMhg"
                                    selectProps={{
                                        onChange: (value) => handleChange(value),
                                        className: "w-full",
                                    }}
                                />
                            </div>
                        )}
                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-lg mdl:text-xl w-24 max-w-24 min-w-24">From</h1>
                            {!fromAddress && (
                                <p className="main-text text-lg mdl:text-xl">
                                    {profile?.fromCity}
                                    {", "}
                                    {fromAddressAbbreviation}
                                </p>
                            )}
                            <button
                                onClick={() => {
                                    handleAddLocation("from");
                                    setIsAddName(false);
                                    setLiveAddress(false);
                                }}
                                className={`${fromAddress ? "btn-sq green-bg" : "btn-sq-light"}`}>
                                {fromAddress ? "Save" : profile?.fromCity ? "Edit" : "Add"}
                            </button>
                        </div>
                        {fromAddress && (
                            <div className="flex mt-10 justify-between items-center">
                                <p className="white-text text-base w-full">Where are you from</p>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyDaxOlDfZZ5r2JtNn0mxnBWpaqGQAsFMhg"
                                    selectProps={{
                                        onChange: (value) => handleChange(value),
                                        className: "w-full",
                                    }}
                                />
                            </div>
                        )}
                        <div className="w-full flex justify-between items-center mt-6">
                            <h1 className="white-text text-left text-xl mdl:text-2xl w-24 max-w-24 min-w-24">Education</h1>
                            {!isEducation && <p className="main-text">{(profile?.education && JSON.parse(profile?.education)?.schoolName) || "What school did you attend"}</p>}
                            <button
                                onClick={() => {
                                    handleAddEducation();
                                    setIsAddName(false);
                                    setLiveAddress(false);
                                }}
                                className={`${isEducation ? "btn-sq green-bg" : "btn-sq-light"}`}>
                                {isEducation ? "Save" : profile?.education ? "Edit" : "Add"}
                            </button>
                        </div>
                        {isEducation && (
                            <div className="flex mt-10 justify-between items-center">
                                <p className="white-text text-base w-full">Where are you from</p>
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyDaxOlDfZZ5r2JtNn0mxnBWpaqGQAsFMhg"
                                    selectProps={{
                                        onChange: (value) => handleChange(value, "education"),
                                        className: "w-full",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="flex flex-col  p-1 mdl:p-2 w-full">
                        {!isCard && !isBank && (
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="white-text uppercase text-left text-xl mdl:text-2xl py-4 my-4 px-2 card-border w-full">bank & cards</h1>

                                {isCardAdded ? (
                                    <div className="card-bg w-full h-16 rounded-lg flex justify-around items-center">
                                        <div className="w-12 h-12 rounded-full card-bg flex justify-center items-center">
                                            <Image
                                                src="/icons/credit.svg"
                                                alt="card"
                                                width={20}
                                                height={20}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <span>{maskedCardNumber}</span>
                                            <div className="flex justify-center space-x-2 items-center">
                                                <span>{visaCard.name}</span>
                                                <span className="bg-[#A1A1A1] w-3 h-3 rounded-full" />
                                                <span>Visa</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 ">
                                            <FaEdit
                                                className="w-6 h-6 white-text !cursor-pointer"
                                                onClick={() => setIsCard(!isCard)}
                                            />
                                            <FaRegTrashAlt className="w-6 h-6 text-[#F9ABAB]" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 rounded-full card-bg flex justify-center items-center mb-4">
                                            <Image
                                                src="/icons/credit.svg"
                                                alt="card"
                                                width={30}
                                                height={30}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                        </div>

                                        <p className="white-text text-base mdl:text-lg text-center mt-4">You have not added any bank or card details</p>
                                    </>
                                )}
                                <div className="mt-10 w-full flex flex-col mdl:flex-row justify-center space-x-0 mdl:space-x-2 space-y-3 mdl:space-y-0">
                                    <button
                                        onClick={() => setIsBank(!isBank)}
                                        className="w-full flex space-x-3 mdl:space-x-2 items-center justify-center 
                            btn-purp white-text rounded-lg border border-[#ccc] py-3 mdl:py-3 px-3  hover:brightness-125">
                                        <FaLandmark className="w-4 h-4 white-text" />
                                        <p className="white-text text-base">Add Bank</p>
                                    </button>
                                    <button
                                        onClick={() => setIsCard(!isCard)}
                                        className="w-full flex space-x-3 mdl:space-x-2 items-center justify-center 
                         btn-blue white-text rounded-lg border border-[#ccc] py-3 mdl:py-3 px-3 hover:brightness-125">
                                        <FaCreditCard className="w-4 h-4 white-text" />
                                        <p className="white-text text-base">Add Card</p>
                                    </button>
                                </div>
                            </div>
                        )}
                        {isCard && !isBank && (
                            <div className="flex flex-col w-full -mt-4">
                                <h1 className="white-text text-center text-xl mdl:text-2xl pt-4 my-1 px-2  w-full">Add a New Card</h1>
                                <Card
                                    number={visaCard.number}
                                    name={visaCard.name}
                                    expiry={visaCard.expiry}
                                    cvc={visaCard.cvc}
                                    focused={visaCard.focused}
                                    callback={handleCallback}
                                    preview={false}
                                />
                                <form
                                    className="mt-4"
                                    ref={formRef}
                                    onSubmit={handleSubmitAddCard}>
                                    <div className="">
                                        <small>Name on card:</small>

                                        <input
                                            type="text"
                                            name="name"
                                            value={visaCard.name}
                                            className="input"
                                            placeholder="Name"
                                            pattern="[a-z A-Z-]+"
                                            required
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                    <div className="">
                                        <small>Card Number:</small>

                                        <input
                                            type="tel"
                                            name="number"
                                            className="input"
                                            value={visaCard.number}
                                            placeholder="Card Number"
                                            pattern="[\d| ]{16,22}"
                                            maxLength="19"
                                            required
                                            onChange={handleInputChange}
                                            onFocus={handleInputFocus}
                                        />
                                    </div>
                                    <div className="grid grid-flow-row grid-cols-2 gap-2">
                                        <div className="form-group">
                                            <small>Expiration Date:</small>

                                            <input
                                                type="tel"
                                                name="expiry"
                                                className="input"
                                                value={visaCard.expiry}
                                                placeholder="Valid Thru"
                                                pattern="\d\d/\d\d"
                                                required
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </div>
                                        <div className="">
                                            <small>CVC:</small>

                                            <input
                                                type="tel"
                                                name="cvc"
                                                value={visaCard.cvc}
                                                className="input"
                                                placeholder="CVC"
                                                pattern="\d{3}"
                                                required
                                                onChange={handleInputChange}
                                                onFocus={handleInputFocus}
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="issuer"
                                        value={visaCard.issuer}
                                    />

                                    <div className="mt-4 flex justify-center items-center space-x-3 w-full">
                                        <button
                                            type="button"
                                            onClick={() => setIsCard(false)}
                                            className="btn-sm btn-blue white-text px-6 py-3 w-full">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn-sm btn-purp white-text px-6 py-3 w-full">
                                            {visaCard.loading ? (
                                                <span className="animate-spin">
                                                    <AiOutlineLoading3Quarters />
                                                </span>
                                            ) : (
                                                "Add Card"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        {isBank && !isCard && (
                            <div className="flex flex-col w-full -mt-7">
                                <h1 className="white-text text-center text-xl mdl:text-2xl pt-6 my-1 px-2  w-full">Add a New Bank</h1>
                                <div className="flex flex-col text-left w-full relative">
                                    <label className="text-base text-left main-text mb-1">Bank Name</label>
                                    <input
                                        className="input"
                                        placeholder="Wells Fargo"
                                        type="text"
                                        name="bankName"
                                        id="bankName"
                                        value={bankAccount.bankName}
                                        onChange={handleBankInputChange}
                                    />
                                </div>

                                <div className="flex flex-col text-left w-full relative">
                                    <label className="text-base text-left main-text mb-1">Account Number </label>
                                    <input
                                        className="input"
                                        type="tel"
                                        required
                                        placeholder="5678-2345-2345-1234"
                                        // pattern="^(?:\d{4}-){3}\d{1,4}$"
                                        name="bankAccountNumber"
                                        value={bankAccount.bankAccountNumber}
                                        id="bankAccountNumber"
                                        maxLength={19}
                                        onChange={handleBankInputChange}
                                    />
                                    {bankAccount.error?.bankAccountNumber && <span className="text-red text-xs">{bankAccount.error?.bankAccountNumber}</span>}
                                </div>
                                <div className="grid grid-cols-2 grid-flow-row gap-4">
                                    <div className="flex flex-col text-left w-full relative ">
                                        <label className="text-base text-left main-text mb-1">Routing Number </label>
                                        <input
                                            className="input"
                                            placeholder="0000"
                                            type="tel"
                                            name="bankRoutingNumber"
                                            id="bankRoutingNumber"
                                            value={bankAccount.bankRoutingNumber}
                                            onChange={handleBankInputChange}
                                        />
                                        {bankAccount.error?.bankRoutingNumber && <span className="text-red text-xs">{bankAccount.error?.bankRoutingNumber}</span>}
                                    </div>
                                    <div className="flex flex-col text-left w-full relative ">
                                        <label className="text-base text-left main-text mb-1">Swift Code</label>
                                        <input
                                            className="input"
                                            type="tel"
                                            placeholder="John Smith"
                                            name="swiftCode"
                                            id="swiftCode"
                                            value={bankAccount.swiftCode}
                                            onChange={handleBankInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center items-center space-x-3 w-full">
                                    <button
                                        onClick={() => setIsBank(false)}
                                        className="btn-sm btn-blue white-text px-6 py-3 w-full">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitBankAccount}
                                        className="btn-sm btn-purp white-text px-6 py-3 w-full">
                                        {bankAccount.loading ? (
                                            <span className="animate-spin">
                                                <AiOutlineLoading3Quarters />
                                            </span>
                                        ) : (
                                            "Add Bank"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default ProfileEditContent;
