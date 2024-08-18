import React from "react";
import SliderModal from "./slidermodal";
import AppLayout from "../../components/COMMON/layout/AppLayout";

export default function page() {
    return (
        <AppLayout>
            <div
                className="w-full h-full min-h-[100vh] z-50 flex flex-col justify-center text-center items-center text-white bg-[#000]"
                style={{
                    backgroundImage: "url(/images/challenge-big.jpg)",
                    backgroundRepeat: "no-repete",
                    backgroundSize: "cover",
                }}>
                {" "}
                <SliderModal />
            </div>
        </AppLayout>
    );
}
