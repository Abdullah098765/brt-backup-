import Image from "next/image";
import logo from "../../../../public/images/logo.svg";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ICONS } from "../../../icons";
const Search = dynamic(() => import("../../../components/SEARCH/Search"));
const MainDropdown = dynamic(() => import("../customDropdowns/MainDropdown"));
const NotificationDropdown = dynamic(() => import("../customDropdowns/NotificationDropdown"));
const ModalLG = dynamic(() => import("../customModals/ModalLG"));

const Navbar = () => {
    return (
        <div className="w-screen min-h-24 flex justify-between items-center py-2 px-4">
            <Link
                href={"/"}
                className="flex space-x-2 items-center text-left">
                <Image
                    src={logo}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                    alt="logo"
                />
                <h1 className="text-white text-3xl hidden lg:block">Bragtime</h1>
            </Link>
            <Search />
            <span className="w-8 h-8 rounded-full bg-white/10 flex justify-center items-center p-[6px] mr-5 lg:hidden">{ICONS["SEARCH"].Icon}</span>
            <div className="flex items-center justify-center gap-5">
                <MainDropdown />
                <NotificationDropdown />
                <ModalLG />
                <button className="w-8 h-8 flex justify-center items-center rounded-full bg-white/10 lg:hidden">{ICONS["MENU"].Icon}</button>
                <Image
                    src={logo}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full hidden lg:block mr-4"
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default Navbar;
