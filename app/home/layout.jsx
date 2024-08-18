import dynamic from "next/dynamic";
const CompleteProfileModal = dynamic(() => import("../../components/COMMON/CompleteProfileModal"));
const Congratulation = dynamic(() => import("../../components/COMMON/CongratutionsModel"));
const MovedLevel1Modal = dynamic(() => import("../../components/COMMON/MovedLevel1Modal"));
const MovedLevel2MessageModal = dynamic(() => import("../../components/COMMON/MovedLevel2MessageModal"));
const AppLayout = dynamic(() => import("../../components/COMMON/layout/AppLayout"));
const PurchaseVotes = dynamic(() => import("../../components/HOME/PurchaseVote/PurchaseModel"), { ssr: false });

export default function Layout({ children }) {
    return (
        <AppLayout>
            {children}
            <CompleteProfileModal />
            <MovedLevel1Modal />
            <MovedLevel2MessageModal />
            <Congratulation />
            <PurchaseVotes />
        </AppLayout>
    );
}
