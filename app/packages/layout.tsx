import dynamic from "next/dynamic";
const AppLayout = dynamic(() => import("../../components/COMMON/layout/AppLayout"));

export default function Layout({ children }) {
    return <AppLayout>{children}</AppLayout>;
}
