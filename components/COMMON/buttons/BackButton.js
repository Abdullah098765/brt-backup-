

const BackButton = ({ handleClose }) => {
    return (
        <button onClick={handleClose} className="absolute top-1 z-50 left-2 w-10 h-10 rounded-full flex justify-center 
  items-center text-center bg-[#FFFFFF0D] hover:bg-[#aba7a380] transition-colors ease-in-out duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-7 h-7 white-text">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>


        </button>
    )
}

export default BackButton;