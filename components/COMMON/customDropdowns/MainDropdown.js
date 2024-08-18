"use client";
import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn } from "@nextui-org/react";
import { AddNoteIcon } from "./AddNoteIcon";
import { CopyDocumentIcon } from "./CopyDocumentIcon";
import { CreateChallengeIcon } from "./CreateChallengeIcon";
import { CreatePostIcon } from "./CreatePostIcon";
import { CreateGroupIcon } from "./CreateGroupIcon";
import { DeleteDocumentIcon } from "./DeleteDocumentIcon";
import { BsCameraReelsFill, BsFillPlusCircleFill } from "react-icons/bs";
import { useModelsStore } from "../../../state/useModelsStore";

const MainDropdown = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const { openModel } = useModelsStore();
    return (
        <div className="hidden lg:block">
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className=" main-text ">
                        <div className="flex items-center justify-center">
                            <BsFillPlusCircleFill className="main-text w-7 h-7" />
                        </div>
                        {/* <h3 className="main-text">Create</h3> */}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant="faded"
                    aria-label="Dropdown menu with icons"
                    className="main-bg ">
                    <DropdownItem
                        key="copy"
                        startContent={<CreateChallengeIcon className={iconClasses} />}
                        className="main-text py-2 hover:bg-[#6f1368d9]"
                        onClick={() => openModel("CHALLENGE")}>
                        Create Challenge
                    </DropdownItem>
                    <DropdownItem
                        key="new"
                        startContent={<AddNoteIcon className={iconClasses} />}
                        className="main-text py-2 hover:bg-[#6f1368d9]"
                        onClick={() => openModel("EVENT")}>
                        Create Event
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        startContent={<CreateGroupIcon className={iconClasses} />}
                        className="main-text py-2 hover:bg-[#6f1368d9]"
                        onClick={() => openModel("GROUP")}>
                        Create Group
                    </DropdownItem>
                    <DropdownItem
                        key="edit"
                        startContent={<CreatePostIcon className={iconClasses} />}
                        className="main-text py-2 hover:bg-[#6f1368d9]"
                        onClick={() => openModel("SNAPSHOT")}>
                        Create Snapshot
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default MainDropdown;
