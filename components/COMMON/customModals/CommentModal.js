import { useState } from 'react';
import CloseButton from '../buttons/CloseButton';
import Image from "next/image";
import { imageUrl } from "../../../utils/url";
const CommentModal = ({ isOpen, handleClose, children, postImage }) => {

    return (
        <>
            {isOpen && (
                <div className="fixed  inset-0 overflow-hidden !z-50 flex justify-center items-center mt-[23%] mdl:mt-[7%]">
                    <div className="fixed inset-0 bg-black opacity-70 h-[100%]"></div>
                    <div className="relative btn-blue rounded-lg 
                     w-full h-60 mdl:w-[700px] h-[550px] white-text !z-50">
                        <CloseButton handleClose={handleClose} />
                        <div className="flex flex-col w-full">
                            <div className='flex h-[100%] w-[100%]'>
                                <div className='h-full w-full mdl:w-[50%] max-w-full mdl:max-w-[50%]'>
                                    <Image 
                                        src={imageUrl(postImage)}
                                         fill
                                        className='h-full w-full mdl:w-[50%] max-w-full mdl:max-w-[50%]'
                                        alt="post image"
                                        />
                                    
                                    </div>
                                <div className='h-full pl-2'>
                                      {children}
                                    </div>

                                </div>
                        </div>
                      
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentModal;