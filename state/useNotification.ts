import { create } from "zustand";
import { NotificationService } from "../apiService/notificationService";
import { sortBy } from "lodash";

interface INotifications {
    createdAt: string;
    description: string;
    notificationType: string;
    title: string;
    updatedAt: string;
    url: string;
    userId: string;
    __v: number;
    _id: string;
    featherId: string;
    status: "ACCEPT" | "REJECT" | "PENDING";
}
interface IProps {
    notifications: INotifications[];
    fetchNotifications: () => void;
    fetchMore: () => void;
    show: boolean;
    setShow: (val: boolean) => void;
    notification: INotifications | null;
    setNotification: (val: INotifications) => void;
    setNotificationsStatus: (status: "ACCEPT" | "REJECT" | "PENDING") => void;
}

export const useNotifications = create<IProps>((set, get) => ({
    notifications: [],
    show: false,
    notification: null,
    setNotificationsStatus(val) {
        const { notifications, notification } = get();
        let items = [...notifications];
        let idx = notifications.findIndex((i) => i._id === notification._id);
        items[idx].status = val;
        set({ notifications: items });
    },
    setNotification(val) {
        set({ notification: val });
    },
    setShow(val) {
        set({ show: val });
    },
    fetchMore() {},
    fetchNotifications: async () => {
        const response = await NotificationService.getNotifications();
        set({ notifications: response.data });
    },
}));
