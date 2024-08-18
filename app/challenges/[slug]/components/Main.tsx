import Image from "next/image";

export default function Main() {
    return (
        <div
            style={{
                background: "url(/assets/background/bg.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "cover",
                overflow: "hidden",
            }}
            className="text-white flex lg:justify-between px-4 w-full h-[90vh] lg:h-[60vh] justify-end">
            <span className="hidden bg-red-800 p-2 py-1 lg:flex w-32 items-center gap-2 text-sm m-2 rounded-lg h-8 ">
                <span className="w-2 h-2 rounded-full bg-white flex"></span>Live 01:08:01
            </span>
            <div className="lg:mt-4 flex gap-8 flex-col mt-24">
                <Image
                    src="/assets/background/bg.webp"
                    alt="background"
                    className="border rounded-lg w-28 h-28 lg:min-w-52 lg:max-w-80 lg:min-h-52 lg:max-h-80 object-cover"
                    width={300}
                    height={300}
                />
                <Image
                    src="/assets/background/bg.webp"
                    alt="background"
                    className="border rounded-lg w-28 h-28 lg:min-w-52 lg:max-w-80 lg:min-h-52 lg:max-h-80 object-cover"
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
}
