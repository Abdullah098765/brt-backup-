import { Button } from "@nextui-org/react";

interface IProps {
    title: string;
    vote: string;
    price: string;
    handleClick: () => void;
}
export default function PackageCard(props: IProps) {
    return (
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-primarySecond rounded-lg border border-primarySecond shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">{props.title}</h3>
            <p className="font-light sm:text-lg ">Best option for personal use & for your next project.</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${props.price}</span>
            </div>
            <ul
                role="list"
                className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                    <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span>
                        Votes : <span className="font-semibold">{props.vote}</span>
                    </span>
                </li>
            </ul>
            <Button
                onClick={props.handleClick}
                radius="full"
                className="bg-gradient-to-tr from-primary to-primarySecond text-white shadow-lg">
                Purchase
            </Button>
        </div>
    );
}
