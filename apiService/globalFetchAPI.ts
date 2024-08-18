"use client";
import { auth } from "../../firebaseConfig";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    timeout: 100000,
});

// Request interceptor
api.interceptors.request.use(
    async (config) => {
        try {
            const idToken = await auth.currentUser.getIdToken();
            if (idToken) {
                config.headers.Authorization = `Bearer ${idToken}`;
            }
            return config;
        } catch (error) {
            console.log({ error });
            return config;
        }
    },
    (error) => {
        console.log({ error });
        return Promise.reject(error);
    }
);

export default api;
