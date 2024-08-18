import { useState } from 'react';
import CloseButton from '../buttons/CloseButton';

const Modal = ({ isModalOpen, handleClose, children }) => {


    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-70"></div>
                    <div className="relative bg-white rounded-lg p-8 max-w-md">
                        <CloseButton handleClose={handleClose} />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;