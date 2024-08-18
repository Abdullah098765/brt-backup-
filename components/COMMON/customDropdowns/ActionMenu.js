import Link from "next/link";

const ActionMenu = ({
    actionMenuName,
    actionMenuContent,
    isActionMenuOpen,
    setIsActionMenuOpen,
    toggleActionMenu,
    handleClick,
}) => {
    return (
        <>
            {isActionMenuOpen && (
                <div className="absolute right-0 top-12 flex flex-col btn-offwhite text-left w-40 h-auto z-50 rounded-xl">
                    <div className="py-1">
                        {actionMenuContent.map((item) =>
                            item?.button ? (
                                <button
                                    onClick={() => handleClick(item.label)}
                                    key={item.id}
                                    className="block px-4 py-2 text-lg grey-text font-semibold hover:bg-[#bab9be]">
                                    <div className="flex space-x-3 items-center">
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                </button>
                            ) : (
                                <Link
                                    key={item.id}
                                    href={item.link}
                                    className="block px-4 py-2 text-lg grey-text font-semibold hover:bg-[#bab9be]">
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

export default ActionMenu;
