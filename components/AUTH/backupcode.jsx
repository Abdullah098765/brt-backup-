"use client";
// import { auth } from "@/firebaseConfig";
// import useAuth from "@/src/hooks/useAuth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    // const [currentUser, loading] = useAuthState(auth);
    const { handleLogin, handleGoogleSignIn, handleFacebookSignIn } = useAuth();

    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.usernameOrEmail || formData.password) {
            console.log("Form data submitted:", formData);
            await handleLogin(formData);
        } else {
            console.log("Email and password is required.");
        }
    };
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl mb-6 text-center font-bold">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold mb-2">
                            Username or Email:
                        </label>
                        <input
                            type="username"
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            placeholder="Username or Email"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold mb-2">
                            Password:
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500"
                            />
                            <button
                                type="button"
                                onClick={handleTogglePassword}
                                className="absolute inset-y-0 right-0 px-4 py-2  text-gray-500 rounded-md focus:outline-none">
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        Sign In
                    </button>
                </form>
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-red-500 mt-3 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                    Continue with Google
                </button>
                <button
                    type="button"
                    onClick={handleFacebookSignIn}
                    className="w-full bg-blue-800 mt-3 text-white py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-blue-900">
                    Continue with Facebook
                </button>
            </div>
        </div>
    );
};

export default Login;
