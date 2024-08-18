const stepperIconWithoutBorder = (
  <span
    className={`w-10 h-1 md:w-[100px] md:h-2 block bg-[#e5e5e5]/30 rounded-full`}
  ></span>
);
const stepperIconFill = (
  <svg
    width="101"
    height="8"
    viewBox="0 0 101 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 md:w-[100px]"
  >
    <rect
      x="0.5"
      width="100"
      height="8"
      rx="4"
      fill="url(#paint0_linear_82_1672)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_82_1672"
        x1="-226.808"
        y1="-308.667"
        x2="-322.597"
        y2="-190.602"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C7FFD0" />
        <stop offset="0.0001" stop-color="#35FF50" />
        <stop offset="1" stop-color="#5D35FF" />
      </linearGradient>
    </defs>
  </svg>
);
const stepperIcon = (
  <svg
    width="100"
    height="10"
    viewBox="0 0 103 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 md:w-[100px]"
  >
    <rect
      x="1.5"
      y="1"
      width="100"
      height="8"
      rx="4"
      fill="white"
      fill-opacity="0.15"
    />
    <rect
      x="1"
      y="0.5"
      width="101"
      height="9"
      rx="4.5"
      stroke="url(#paint0_linear_82_1542)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_82_1542"
        x1="-231.354"
        y1="-385.833"
        x2="-353.716"
        y2="-262.768"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C7FFD0" />
        <stop offset="0.0001" stop-color="#35FF50" />
        <stop offset="1" stop-color="#5D35FF" />
      </linearGradient>
    </defs>
  </svg>
);
const rightIcon = (
    <svg
      width="22"
      height="14"
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66797 12.0184L9.8731 20.1666L28.3346 1.83325"
        stroke="#78F078"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
export default function StepperHeader({
  children,
  setAddChallenge,
  addChallenge,
  setStep,
  step,
}) {
  return (
    <div className="fixed w-full h-full flex flex-col items-center justify-center text-center overflow-x-hidden bg-[#19253e]">
      <div className="absolute top-[70px] left-0 text-white flex items-center justify-between w-full px-5">
        <button
          onClick={() => setAddChallenge(!addChallenge)}
          className="hidden md:block"
        ></button>
        <span
          onClick={() => setStep(step - 1)}
          className="block md:hidden mr-6 cursor-pointer z-0 lg:z-50"
        >
          <svg
            width="12"
            height="22"
            viewBox="0 0 12 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4"
          >
            <path
              d="M11 1L1 11L11 21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <div className="flex gap-2 items-center">
          <span
            onClick={() => setStep(step - 1)}
            className="mr-6 cursor-pointer z-50 hidden md:block"
          >
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1L1 11L11 21"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          {step === 2 ? (
            <>
              {stepperIcon}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
            </>
          ) : step === 3 ? (
            <>
              {stepperIconFill}
              {stepperIcon}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
            </>
          ) : step === 4 ? (
            <>
              {stepperIconFill}
              {stepperIconFill}
              {stepperIcon}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
            </>
          ) : step === 5 ? (
            <>
              {stepperIconFill}
              {stepperIconFill}
              {stepperIconFill}
              {stepperIcon}
              {stepperIconWithoutBorder}
            </>
          ) : step === 8 ? (
            <>
              {stepperIconFill}
              {stepperIconFill}
              {stepperIconFill}
              {stepperIconFill}
              {stepperIcon}
            </>
          ) : step===9 ? <>
                {stepperIconFill}
              {stepperIconFill}
              {stepperIconFill}
              {stepperIconFill}
              {rightIcon}
          </> : (
            <>
              {stepperIcon}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
              {stepperIconWithoutBorder}
            </>
          )}
          {/* {stepperIcon}
            {stepperIconWithoutBorder}
            <span
              className={`w-[100px] h-2 block bg-[#e5e5e5]/30 rounded-full`}
            ></span>
            <span
              className={`w-[100px] h-2 block bg-[#e5e5e5]/30 rounded-full`}
            ></span>
            <span
              className={`w-[100px] h-2 block bg-[#e5e5e5]/30 rounded-full`}
            ></span> */}
          <span className="ml-6 hidden md:block">
            <svg
              width="12"
              height="22"
              viewBox="0 0 12 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 21L11 11L1 1"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <span>{step}</span>
          <span>
            <svg
              width="18"
              height="24"
              viewBox="0 0 18 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8768 0.102052C14.0236 0.18716 14.1372 0.319537 14.1991 0.477559C14.2609 0.63558 14.2673 0.809904 14.2173 0.972052L11.5158 9.75005H16.5003C16.6468 9.74999 16.7901 9.79283 16.9125 9.87328C17.0349 9.95372 17.1311 10.0683 17.1892 10.2027C17.2472 10.3372 17.2646 10.4858 17.2393 10.63C17.2139 10.7743 17.1468 10.908 17.0463 11.0146L5.0463 23.7646C4.93019 23.888 4.77568 23.9685 4.60796 23.9929C4.44024 24.0173 4.26919 23.9842 4.1227 23.899C3.97622 23.8137 3.86292 23.6814 3.80129 23.5235C3.73965 23.3656 3.73331 23.1915 3.7833 23.0296L6.4848 14.2501H1.5003C1.35382 14.2501 1.21052 14.2073 1.08811 14.1268C0.965693 14.0464 0.869515 13.9318 0.811447 13.7974C0.753379 13.6629 0.735963 13.5143 0.761349 13.3701C0.786735 13.2258 0.853812 13.0921 0.954299 12.9856L12.9543 0.235552C13.0703 0.112251 13.2245 0.0318052 13.392 0.00729508C13.5595 -0.017215 13.7304 0.0156521 13.8768 0.100552V0.102052Z"
                fill="#F1DA60"
              />
            </svg>
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
