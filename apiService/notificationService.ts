import api from "./globalFetchAPI";
export class NotificationService {
    static async getNotifications() {
        try {
            return await api.get("/notifications/me?limit=5&offset1");
        } catch (error) {
            return error;
        }
    }
}
