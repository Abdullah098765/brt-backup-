import React, { useEffect, useState, useMemo } from "react";
import { Tooltip, Button, Grid, Avatar } from "@nextui-org/react";
import UserCard from "../profile/UserCard";
// import {
//   Amplify,
//   Auth,
//   API,
//   graphqlOperation,
//   withSSRContext,
//   Storage,
// } from "aws-amplify";
// import { GetStaticProps, NextPage } from "next";
// import { searchUsers } from "../../src/graphql/customqueries";
import Link from "next/link";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import { imageUrl } from "../../utils/url";
// import { ifChatExists, isOnline, newMsgRecieve } from "../../utils/chat";
// import { closeMblMenu } from "../../redux/counterSlice";
// import { useSelector, useDispatch } from "react-redux";
// import Search from "./search";
import { motion } from "framer-motion";
import { highlightSearchResults } from "../../utils/utils";
import UserImage from "../Common/UserImage";
export default function SearchResults({
  usersearch,
  emptySearch,
  searchTerm,
  selectedUser,
}) {
  // const dispatch = useDispatch();
  const handleItemDropdown = (e) => {
    const target = e.target.closest("li");

    if (!target.classList.contains("show")) {
      target.classList.add("show");
    } else {
      target.classList.remove("show");
    }
  };
 
  return (
    <>
      <ul
        className=" absolute  lg:-top-3  lg:left-1 text-white bg-[#803abdb3]  xs:min-w-[100%] rounded-xl border border-[#17117E]
       z-50   whitespace-nowrap px-1 transition-all hover-bg-[#fff]
         will-change-transform opacity-100  lg:translate-y-4 lg:py-1 py-1    lg:shadow-2xl lg:shadow-[#CED452] xs:shadow-xl 
         xs:shadow-[#CED452] lg:group-hover:translate-y-2 
        h-auto max-h-[24rem] overflow-y-auto scrollbar-hide hover:scrollbar-hover hover:brightness-110"
        aria-labelledby="navDropdown-4"
        onClick={(e) => handleItemDropdown(e)}
        style={{ zIndex: 999999 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0, duration: 2.7 }}
        >
          {!usersearch?.length ? (
            <div className="text-center flex justify-center items-center gap-2 z-50 rounded-xl">
              <span>
                <svg
                  width="32px"
                  height="32px"
                  viewBox="0 0 56 56"
                  xmlns="http://www.w3.org/2000/svg"
                  className="dark:text-jacarta-200"
                >
                  <g
                    id="Icons-56/error_outline_56"
                    stroke="#fff"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="error_outline_56">
                      <rect x="0" y="0" width="56" height="56"></rect>
                      <path
                        d="M28,4 C41.254834,4 52,14.745166 52,28 C52,41.254834 41.254834,52 28,52 C14.745166,52 4,41.254834 4,28 C4,14.745166 14.745166,4 28,4 Z M28,7 C16.4020203,7 7,16.4020203 7,28 C7,39.5979797 16.4020203,49 28,49 C39.5979797,49 49,39.5979797 49,28 C49,16.4020203 39.5979797,7 28,7 Z M28,34 C29.1045695,34 30,34.8954305 30,36 C30,37.1045695 29.1045695,38 28,38 C26.8954305,38 26,37.1045695 26,36 C26,34.8954305 26.8954305,34 28,34 Z M28,16.5 C28.8284271,16.5 29.5,17.1715729 29.5,18 L29.5,29 L29.4931334,29.14446 C29.4204487,29.9051119 28.7796961,30.5 28,30.5 C27.1715729,30.5 26.5,29.8284271 26.5,29 L26.5,18 L26.5068666,17.85554 C26.5795513,17.0948881 27.2203039,16.5 28,16.5 Z"
                        id="↳-Icon-Color"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                    </g>
                  </g>
                </svg>
              </span>
              <span className="dark:text-jacarta-200">User Not Found...!</span>
            </div>
          ) : (
            usersearch?.map((useritem, index) => (
              <li
                className={` ${
                  selectedUser === index &&
                  "bg-[#581C87] rounded-xl w-full px-2"
                }`}
                key={index}
                onClick={() => emptySearch()}
              >
                <Link
                  href={`/profile/${useritem?.id}`}
                  className="cursor-pointer z-50 "
                >
                  <div
                    className={`grid grid-cols-6  rounded-xl border-1 
            border-opacity-70 py-2 px-0  
                   relative  items-center z-50
              p-1 transition-shadow     `}
                    style={{ zIndex: 999999 }}
                  >
                    <Tooltip
                      placement="bottom"
                      content={<UserCard useritem={useritem} />}
                    >
                      <UserImage
                        className="mr-6 hover:scale-110 w-16 h-16 min-w-16 min-h-16 rounded-full object-cover"
                        picture={useritem?.picture}
                        userID={useritem?.id}
                        width={148}
                        height={148}
                        gender={useritem?.gender}
                      />

                      <figure className="mr-5 self-start cursor-pointer mt-[3px]">
                        <div className="w-16 h-16 shadow-sm col-span-1  relative">
                          {useritem?.isOnline ? (
                            <span className="absolute bottom-1 right-2">
                              <svg width={14} height={14} className="z-40">
                                <circle cx={6} cy={6} r={6} fill="#4AF15A" />
                              </svg>
                            </span>
                          ) : (
                            <span className="absolute bottom-1 right-2">
                              <svg width={14} height={14} className="z-40">
                                <circle cx={6} cy={6} r={6} fill="#A9A5A4" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </figure>
                    </Tooltip>
                    <div className="col-span-3 flex flex-col ml-4">
                      <h3 className=" font-display dark:text-jacarta-400 mb-0 text-base font-semibold dark:text-white lg:text-xl xs:text-lg lg:tracking-wide">
                        {highlightSearchResults(
                          searchTerm,
                          useritem.username.slice(0, 7)
                        )}
                        {/* {useritem.username.slice(0, 7)} */}
                      </h3>
                      <span className="dark:text-jacarta-400 mb-2  block text-sm xs:hidden lg:inline-flex">
                        {useritem?.firstName
                          ? "Name: " +
                            useritem?.firstName.slice(0, 8) +
                            " " +
                            useritem?.lastName.slice(0, 9)
                          : "Name: Private"}
                      </span>
                      <div>
                        <span className="text-jacarta-300 block text-xs">
                          Level: {useritem?.level || 1}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-2 flex flex-row items-center justify-end gap-2">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setInCall(true);
                          console.log("PHONE");
                        }}
                        className="grid h-10 w-10 place-items-center rounded-full bg-[#581C87] hover:scale-110"
                      >
                        {/* Heroicon name: mini/phone */}
                        <svg
                          className="h-5 w-5 text-gray-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#581C87] hover:scale-110">
                        {/* Heroicon name: mini/phone */}
                        <svg
                          className="h-5 w-5 text-gray-50"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </motion.div>
      </ul>
    </>
  );
}
