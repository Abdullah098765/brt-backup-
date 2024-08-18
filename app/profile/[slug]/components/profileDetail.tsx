import { memo } from "react";
import { ICONS } from "../../../../icons";
import Image from "next/image";

function ProfileDetail() {
    let buttons = [
        {
            name: "View Wallet",
            icon: ICONS["WALLET"].Icon,
            background: "bg-background",
            handler: () => {},
        },
        {
            name: "Manage Settings",
            icon: ICONS["SETTING"].Icon,
            background: "bg-primary",
            handler: () => {},
        },
    ];
    let coinAndLevelOptions = [
        {
            value: "1000",
            icon: ICONS["BRG"].Icon,
        },
        {
            value: "Level 4 🔥",
            icon: ICONS["CROWN"].Icon,
        },
    ];
    return (
        <div className="bg-backgroundSecondary text-white z-20 rounded-t-2xl flex flex-col p-6">
            <div className="my-3 flex justify-start items-center gap-2 relative">
                <Image
                    src={"/404.png"}
                    alt="Not found"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover border-2 rounded-full"
                />
                <div className="flex flex-col items-start">
                    <p className="font-bold text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">
                        Wallet ID: <span className="text-white">12313231</span>{" "}
                    </p>
                </div>
                <span className="absolute top-1 left-9">{ICONS["GREEN_TICK"].Icon}</span>
            </div>
            <div className="mb-3 flex justify-start items-center gap-2 relative">
                {coinAndLevelOptions.map((item) => (
                    <span
                        key={item.value}
                        className="flex items-center justify-center border p-1 px-2 rounded-full bg-white/10 ">
                        <span>{item.icon}</span> <span className="text-xs ml-1">{item.value}</span>
                    </span>
                ))}
            </div>
            <div className="flex justify-between gap-10">
                {buttons.map((item) => (
                    <button
                        key={item.name}
                        className={`${item.background} py-3 border rounded-xl w-48 flex items-center justify-center gap-3`}>
                        <span>{item.icon}</span> <span>{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default memo(ProfileDetail);
