import { create } from "zustand";
import { UserService } from "../apiService/userService";
interface IUser {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    bragname: string;
    bio: string;
    picture: string;
    profilePicture: string;
    gender: string;
    dateofbirth: string;
    country: string;
    state: string;
    city: string;
    school: string;
    work: string;
    interests: string[];
    languages: string[];
    level: number;
    point: number;
    wins: number;
    loses: number;
    message: string;
    completeInfo: boolean;
    wallet: string;
    walletInfo: boolean;
    fcmToken: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    congratulations?: boolean;
    // Add other properties as needed
}

interface IUseUserStore {
    user: IUser | null;
    fetchUserData: () => Promise<void>;
    setUser: (u: any) => void;
    updateUser: (body: any) => Promise<void>;
    updateFcmToken: (token: string) => Promise<void>;
    setProfileImage: (file: File) => Promise<void>;
    updateUserWallet: (wallet: any) => Promise<void>;
    searchUser: (val: string) => Promise<void>;
}

export const useUserStore = create<IUseUserStore>((set, get) => ({
    user: null,
    fetchUserData: async () => {
        const response = await UserService.me();
        set({ user: response });
    },
    setUser: (u) => {
        set({ user: u });
    },
    updateUser: async (body) => {
        const response = await UserService.update(body);
        console.log("updateUser", { response });
        set({ user: response });
    },
    updateFcmToken: async (token) => {
        const response = await UserService.updatefcmToken(token);
        console.log("updateFcmToken", { response });
        set({ user: response });
    },
    setProfileImage: async (file) => {
        const { user } = get();
        await UserService.profileImage(file);
        let params = {
            ...user,
            picture: URL.createObjectURL(file),
        };
        set({ user: params });
    },
    updateUserWallet: async (wallet) => {
        const { user } = get();
        if (user?.wallet) return;
        const response = await UserService.updateWallet(wallet);
        let params = {
            ...response,
            wallet: wallet,
        };
        set({ user: params });
    },
    searchUser: async (val) => {
        const response = await UserService.searchUser(val);
        console.log("searchUser", { response });
    },
}));
