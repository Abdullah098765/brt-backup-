import { auth } from "../../firebaseConfig";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    PhoneAuthProvider,
    RecaptchaVerifier,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "@firebase/auth";
import { createCookies } from "../cookies/setCookies";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToastError } from "../notification";

export default function useAuth() {
    // const [currentUser, loading] = useAuthState(auth);
    const [walletAddress, setWalletAddress] = useState(null);

    const router = useRouter();
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.user);

    // useEffect(() => {
    //     console.log("User from Redux state ", user);
    // }, [user]);
    // useEffect(() => {
    //     if (!loading) {
    //         if (currentUser) {
    //             console.log("====================================");
    //             console.log("User is logged in!");
    //             console.log("====================================");
    //             dispatch(fetchUser(currentUser.email));
    //         } else {
    //             console.log("====================================");
    //             console.log("User is not logged in!");
    //             console.log("====================================");
    //             dispatch(resetUserState());
    //         }
    //     }
    // }, [currentUser, loading]);
    // function isValidEmail(email) {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailPattern.test(email);
    // }
    async function handleEmailPasswordSignUp(credential, setIsEmailSigningUp) {
        console.log("handleEmailPasswordSignUp", { credential });
        createUserWithEmailAndPassword(auth, credential.email, credential.password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log("handleEmailPasswordSignUp", { userCredential });
                if (user) {
                    await updateProfile(user, { displayName: credential.firstname + " " + credential.lastname });
                    // await saveNewUserInDatabase(credential.firstname, credential.lastname, credential.email);
                    await sendVerificationEmailLink(credential.email);
                    console.log("handleEmailPasswordSignUp", { message: "LINK SENT" });
                    // setErrorMessage(false)

                    setIsEmailSigningUp(false);
                    return true;
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log("handleEmailPasswordSignUp", { error });
                // alert(errorCode);

                if (errorCode === "auth/email-already-in-use") {
                    showToastError("Email is already in use, try new email");
                }
                if (errorCode === "auth/invalid-email") {
                    showToastError("Please enter a valid email address.");
                }
                if (errorCode === "auth/weak-password") {
                    showToastError("Password should be at least 6 characters");
                }
                console.log(error);
                setIsEmailSigningUp(false);

                return false;
            });
    }
    // async function saveNewUserInDatabase(firstname, lastname, email) {
    //     try {
    //         const response = await fetch("/api/signup", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ firstname, lastname, email }),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log("Form data submitted:", data);
    //         } else {
    //             const errorData = await response.json();
    //             console.error(errorData.error);
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }
    async function sendVerificationEmailLink(email) {
        sendEmailVerification(auth.currentUser)
            .then((status) => {})
            .then((userRecord) => {
                router.push("verification_email_sent");
            })
            .catch((error) => {
                console.log("Error sending vr email:", error.message);
                alert("Error sending verification email:", error.message);
            });
    }
    async function getUserByUsernameOrEmail(usernameOrEmail) {
        try {
            const response = await fetch("/api/get_user_by_username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usernameOrEmail,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                return userData.email;
            } else {
                console.error("Error retrieving user data:", response.status, response.statusText);
                return null;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            return null;
        }
    }
    async function handleGoogleSignIn(router) {
        const provider = new GoogleAuthProvider();

        var result = await signInWithPopup(auth, provider);
        if (result) {
            const isUserExist = await getUserByUsernameOrEmail(result.user.email);
            if (!isUserExist) {
                // const fullName = result.user.displayName;
                // const firstName = fullName.split(" ")[0];
                // const lastName = fullName.split(" ")[1];

                // let registrationResponse = await saveNewUserInDatabase(firstName, lastName, result.user.email);
                // if (registrationResponse) {
                //     console.log("Your account has been successfully registered.", "success", registrationResponse);
                //     router.push(`/register_user`);
                // } else {
                router.push(`/register_user`);
                // }
            } else {
                createCookies(JSON.stringify(result.user));
                router.push(`/home?fromlogin=true`);
            }
        } else {
            console.log("Unable To sign In with Google");
        }
    }
    async function handleFacebookSignIn(router) {
        const provider = new FacebookAuthProvider();
        try {
            var result = await signInWithPopup(auth, provider);
            if (result) {
                // const isUserExist = await getUserByUsernameOrEmail(result.user.email);

                // if (!isUserExist) {
                //     const fullName = result.user.displayName;
                //     const firstName = fullName.split(" ")[0];
                //     const lastName = fullName.split(" ")[1];

                //     let registrationResponse = await saveNewUserInDatabase(firstName, lastName, result.user.email);
                //     if (registrationResponse) {
                //         console.log("Your account has been successfully registered.", "success", registrationResponse);
                //         // window.location.href = `${origin}/register_user`;
                //     }
                //     // else window.location.href = `${origin}/register_user`;
                // } else {
                //     createCookies(JSON.stringify(result.user));
                router.push(`/home?fromlogin=true`);
                // window.location.href = `${origin}`;
                // }
            } else {
                console.log("Unable To sign In with Google");
            }
        } catch (error) {
            console.log({ error });
        }
    }
    async function handleLogin(loginData, setIsSigningIn) {
        console.log("handleLogin", { loginData });
        if (!loginData.usernameOrEmail || !loginData.password) {
            // setErrorMessage("All fields are required");
            // setIsLoggingIn(false);
            console.log("All fields are required");
            alert("All fields are required");
            setIsSigningIn(false);
            return;
        }
        try {
            // const userEmailForFirebaseSignIn = await getUserByUsernameOrEmail(loginData.usernameOrEmail);

            // if (!userEmailForFirebaseSignIn) {
            //     //   setErrorMessage("This user does not exist");
            //     //   setIsLoggingIn(false);

            //     console.log("User does not exist!");
            //     setIsSigningIn(false);
            //     alert("User does not exist!");

            //     return;
            // }

            // console.log(userEmailForFirebaseSignIn, loginData.password);

            signInWithEmailAndPassword(auth, loginData.usernameOrEmail, loginData.password)
                .then(function (userCredential) {
                    console.log("handleLogin", { loginData });
                    createCookies(JSON.stringify(userCredential.user));
                    setIsSigningIn(false);
                    router.push("/home");
                })
                .catch(function (error) {
                    if (error.code == "auth/multi-factor-auth-required") {
                        var recaptchaVerifier;
                        if (!recaptchaVerifier) {
                            recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
                                size: "invisible",
                                callback: (response) => {
                                    console.log(response);
                                },
                                "expired-callback": () => {},
                            });
                        }
                        recaptchaVerifier.render().then(function (widgetId) {
                            console.log("reCAPTCHA widget rendered with ID:", widgetId);
                        });
                        const resolver = getMultiFactorResolver(auth, error);
                        // Ask user which second factor to use.
                        console.log(resolver);
                        setResolver(resolver);

                        if (resolver.hints[0].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
                            const phoneInfoOptions = {
                                multiFactorHint: resolver.hints[0],
                                session: resolver.session,
                            };
                            const phoneAuthProvider = new PhoneAuthProvider(auth);
                            // Send SMS verification code
                            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier).then(function (verificationId) {
                                // Ask user for the SMS verification code. Then:
                                setVerificationId(verificationId);
                                setIsOtpSent(true);
                            });
                        } else if (resolver.hints[0].factorId === TotpMultiFactorGenerator.FACTOR_ID) {
                            recaptchaVerifier.clear();
                            console.log("called");
                        } else {
                            recaptchaVerifier.clear();
                            console.log("called");
                        }
                        recaptchaVerifier.clear();
                    } else if (error.code == "auth/wrong-password") {
                        // setErrorMessage("Wrong Password");
                    } else {
                        console.log(error.code);
                        alert(error.code);
                    }
                    alert(error.code + " ");
                    setIsSigningIn(false);
                });
        } catch (error) {
            console.error("Error logging in:", error.message);
            alert(error.code);
        }
    }
    async function handleLogout() {
        signOut(auth)
            .then(() => {
                createCookies(null);
            })
            .catch((error) => {});
    }
    async function connectMetamask() {
        if (provider) {
            const accounts = await provider.request({ method: "eth_requestAccounts" });
            const selectedAccount = accounts[0];
            console.log(selectedAccount);
        } else {
            alert("Please install Metamask to continue.");
            window.open("https://metamask.io");
        }
    }

    async function disconnectWallet() {
        if (provider) {
            try {
                await provider.request({ method: "eth_requestAccounts" });
                setWalletAddress(null); // Update state to reflect disconnection
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(error);
        }
    }
    return {
        handleEmailPasswordSignUp,
        getUserByUsernameOrEmail,
        sendVerificationEmailLink,
        handleGoogleSignIn,
        handleFacebookSignIn,
        handleLogin,
        handleLogout,
        connectMetamask,
        disconnectWallet,
        walletAddress,
    };
}
