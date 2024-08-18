"use client";
import { useState } from "react";
import Image from "next/image";
import { ICONS } from "../../icons";

const Search = () => {
    // const [isSearch, setIsSearch] = useState(false);
    // const placeholder = "Search for friends and more";
    return (
        <div className="flex items-end justify-end lg:justify-center gap-4 w-full">
            <div className="hidden h-10 bg-white/10 lg:flex items-center justify-centers px-10 rounded-full gap-5">
                <div className="">
                    <Image
                        width={44}
                        height={44}
                        src="/icons/search.svg"
                        alt="search icon"
                        className=" w-6 h-6 m-0 "
                    />
                </div>
                <input
                    type="text"
                    className="bg-transparent text-base focus:outline-none text-white"
                    placeholder="Search for challenge "
                />

                {/* <input
                type="text"
                placeholder={placeholder}
                className={`${isSearch ? "lg:Search-Input1 Search-Input-Sm1" : "lg:Search-Input Search-Input-Sm "}  z-50 transition ease-in-out duration-300 `}
            /> */}
            </div>
            <span className="bg-white/10  rounded-full w-10 h-10 justify-center items-center hidden lg:flex">{ICONS["MIC"].Icon}</span>
        </div>
    );
};

export default Search;
