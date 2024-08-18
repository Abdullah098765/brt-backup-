"use client";
import useAuth from "../../hooks/useAuth";
export const LogoutButton = () => {
    const { handleLogout } = useAuth();
    return <button onClick={handleLogout}>Logout</button>;
};
