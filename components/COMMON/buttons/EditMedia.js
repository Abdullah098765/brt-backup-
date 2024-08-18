import {useState} from "react";
import { HiOutlinePencil } from "react-icons/hi";


const EditMedia = ({ toggleActionMenu, index, isEditMedia, setIsEditMedia}) => {

    return (
        <button onClick={() => toggleActionMenu(index)}  className="absolute top-4 right-2 card3-bg w-8 h-8 flex justify-center items-center 
                                rounded-full z-40 hover:brightness-125">
            <HiOutlinePencil className="w-5 h-5 white-text !cursor-pointer " />
        </button>
    )
}

export default EditMedia;