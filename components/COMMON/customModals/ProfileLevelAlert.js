import { useState } from "react";
import { FaFireAlt } from "react-icons/fa";


const ProfileLevelAlert = () => {
    const level = 5;
    return (
        <div className="modal-bg w-full h-auto my-6  py-8 border-2 border-[#ccc]  
               flex flex-col justify-center items-center text-center white-bg">
            <div className="flex space-x-2 white-text">
                <h1 className="uppercase text-xl mdl:2xl font-bold">
                    You are currently on level {level}
                </h1>
                <FaFireAlt className="orange-text w-5 h-5 mt-1" />
            </div>
            <p className="mt-3 main-text text-base mdl:text-lg">
                Do you want to quickly get promoted to another level?
            </p>
            <p className="mt-2 main-text text-base mdl:text-lg">
                Always participate in challenges, upload media, create posts, invite friends, <br />
                get promoted by votes, OR purchase a voting or points package, or BRG's
            </p>

        </div>
    )
}

export default ProfileLevelAlert;