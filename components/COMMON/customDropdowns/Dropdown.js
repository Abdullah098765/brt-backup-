import Link from "next/link";

const Dropdown = ({ featureContent, isOpen, handleClick }) => {
    return (
        <>
            {isOpen && (
                <div className="absolute right-0 top-10 flex flex-col btn-blue text-left w-40 h-auto !z-50 rounded-xl">
                    <div className="py-1">
                        {featureContent.map((item) =>
                            item?.button ? (
                                <button
                                    onClick={() => handleClick(item.label)}
                                    key={item.id}
                                    className="block px-4 py-2 text-lg white-text hover:bg-[#8171C1]">
                                    <div className="flex space-x-3 items-center">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    key={item.id}
                                    href={item.link}
                                    className="block px-4 py-2 text-lg white-text hover:bg-[#8171C1]">
                                    <div className="flex space-x-3 items-center">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Dropdown;
