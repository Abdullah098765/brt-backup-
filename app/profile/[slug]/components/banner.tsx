import { memo } from "react";
import Image from "next/image";
import { ICONS } from "../../../../icons";
function Banner() {
    return (
        <div className="relative z-10">
            <Image
                src={"/404.png"}
                alt="Not found"
                width={1280}
                height={500}
                className="w-full min-h-56 max-h-56 object-cover"
            />
            <button className="w-10 h-10 rounded-lg absolute top-3 right-3 bg-background/80 flex justify-center items-center">{ICONS["CAMERA"].Icon}</button>
        </div>
    );
}

export default memo(Banner);
