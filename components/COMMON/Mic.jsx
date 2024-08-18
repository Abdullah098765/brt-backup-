import { memo } from "react";
function Mic({ listening, onStart, onStop }) {
  return (
    <div
      onClick={() => (listening ? onStop() : onStart())}
      // onClick={() => alert()}
      className=" rounded-full h-8 w-8   cursor-pointer  relative"
    >
      {listening && (
        <>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
          <span className="relative inline-flex rounded-full  h-8 w-8 bg-red"></span>
        </>
      )}

      <svg
        viewBox="0 0 24 24"
        fill="#efe3facc"
        className=" h-7 text-[#fff] absolute top-1 left-[2px]  rounded-full cursor-pointer hover:bg-[#605A62]"
      >
        <g className="style-scope yt-icon">
          <path
            d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"
            className="style-scope yt-icon"
          ></path>
        </g>
      </svg>
    </div>
  );
}

export default memo(Mic);
