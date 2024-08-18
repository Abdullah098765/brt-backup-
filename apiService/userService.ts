import api from "./globalFetchAPI";
export class UserService {
    static async me() {
        try {
            const result = await api.get("/me");
            return result.data;
        } catch (error) {
            console.log("UserService", { error });
            return error;
        }
    }
    static async update(body) {
        try {
            let temp = { ...body };
            delete temp.picture;
            const result = await api.put("/me", temp);
            return result.data;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }
    static async updateWallet(wallet) {
        try {
            const result = await api.put("/me", { wallet });
            return result.data;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }
    static async updatefcmToken(fcmToken) {
        try {
            const result = await api.put("/me", { fcmToken });
            return result.data;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }
    static async searchUser(user) {
        try {
            const result = await api.get(`/me/search-user?user=${user}`);
            console.log({ result });
            return result.data;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }

    static async profileImage(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post("/me/profileImage", formData);
            return response.data;
        } catch (error) {
            console.log({ error });
            return error;
        }
    }
}
