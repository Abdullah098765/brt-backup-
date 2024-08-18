import dynamic from "next/dynamic";
const UserDetails = dynamic(() => import("./components/details"));

export default function Profile() {
    return (
        <div className="">
            <UserDetails />
        </div>
    );
}
