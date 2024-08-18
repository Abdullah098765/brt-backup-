// 'use client'
// import React, { useState, useCallback, useEffect, memo, useRef } from "react";
// import { debounce } from "lodash";
// import { GrClose } from "react-icons/gr";
// import { useSelector, useDispatch } from "react-redux";
// import { BiCalendarEvent } from "react-icons/bi";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
// import { setSearchMic } from "../../redux/micSlice";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css"; // main style file date picker
// import "react-date-range/dist/theme/default.css"; // theme css file picker
// // import useRecentSearches from "../../Hooks/useRecentSearch";
// import { AiOutlineFileSearch } from "react-icons/ai";
// import CloseButton from "../COMMON/buttons/CloseButton";

// // const SearchRow = dynamic(() => import("./SearchRow"), {
// //   ssr: false,
// // });
// // const SearchCategories = dynamic(() => import("./SearchCategories"), {
// //   ssr: false,
// // });
// const Mic = dynamic(() => import("../COMMON/Mic"), {
//   ssr: false,
// });
// const Search = ({
//   isMobile,
//   categoryList,
//   internalFilter,
//   filterItems,
//   setFilterItems,
//   setNextToken,
//   handleClose
// }) => {
//   const dispatch = useDispatch();
//   // const { saveSearch, searches } = useRecentSearches();
//   const { transcript, listening } = useSpeechRecognition();
//   // const { profile } = useSelector((state) => state.auth);
//   const router = useRouter();
//   // const { userSearch } = useSelector((state) => state.userSearch);

//   const [showResults, setShowResults] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [placeholder, setPlaceholder] = useState("Search...");
//   const [selectedUser, setSelectedUser] = useState(0);

//   const [selectedCategory, setSelectedCategory] = useState(0); //User
//   const [selectedCategoryOpen, setSelectedCategoryOpen] = useState(false);
//   const [calenderOpen, setCalenderOpen] = useState(false);
//   const [isSearch, setIsSearch] = useState(false);

//   const [dateSelected, setDateSelected] = useState(false);

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   // const { isGeneral, isEmoji } = useSelector((state) => state.mic);
//   const handleRedirectUrl = (id) => {
//     const item = userSearch?.find((item) => item.id === id);
//     const url = categoryList[selectedCategory]?.redirectUrl(id);
//     saveSearch({ ...item, url });
//     if (categoryList[selectedCategory].title === "Recent") {
//       router.push(categoryList[selectedCategory]?.redirectUrl(item.url));
//       emptySearch();
//       dispatch(setUserSearch([]));
//     } else {
//       router.push(categoryList[selectedCategory]?.redirectUrl(id));
//       emptySearch();
//       dispatch(setUserSearch([]));
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (!userSearch && userSearch?.length === 0) return;
//     if (event.key === "ArrowDown") {
//       if (selectedUser >= userSearch?.length - 1) {
//         setSelectedUser(0);
//       } else {
//         setSelectedUser(selectedUser + 1);
//       }
//     } else if (event.key === "ArrowUp") {
//       if (selectedUser <= 0) {
//         setSelectedUser(userSearch?.length - 1);
//       } else {
//         setSelectedUser(selectedUser - 1);
//       }
//     }
//     if (event.key === "Enter") {
//       handleRedirectUrl(userSearch[selectedUser].id);
//     }
//   };

//   const handleSearch = useCallback(
//     debounce(
//       async (value, selectedCategory, startDate, endDate, dateSelected) => {
//         try {
//           if (categoryList[selectedCategory].title === "Recent") {
//             dispatch(setUserSearch(searches));
//             setShowResults(searches?.length > 0);
//           } else {
//             const response = await API.graphql(
//               graphqlOperation(categoryList[selectedCategory]?.query, {
//                 filter: categoryList[selectedCategory]?.filter(
//                   value,
//                   startDate,
//                   endDate,
//                   dateSelected
//                 ),
//                 limit: 5,
//               })
//             );
//             if (categoryList[selectedCategory]?.title !== "Friends") {
//               let temp = response.data[
//                 categoryList[selectedCategory].field
//               ].items.map((item) => {
//                 return {
//                   ...item,
//                   ...item?.user,
//                   ...item?.owner,
//                   title:
//                     item?.title ||
//                     item.channelName ||
//                     item?.groupName ||
//                     item?.eventName ||
//                     null,
//                   banner:
//                     item?.groupBanner ||
//                     item?.eventBanner ||
//                     item?.channelBanner ||
//                     null,
//                   video: item?.video || null,
//                 };
//               });
//               dispatch(setUserSearch(temp));
//               setShowResults(temp?.length > 0);
//             } else if (categoryList[selectedCategory]?.title === "Friends") {
//               let temp = response.data[
//                 categoryList[selectedCategory].field
//               ].items.map((item) => {
//                 if (
//                   item?.username === profile?.username &&
//                   item?.user1ID === profile?.username
//                 ) {
//                   return { ...item?.user2 };
//                 } else if (
//                   item?.username === profile?.username &&
//                   item?.user2ID === profile?.username
//                 ) {
//                   return { ...item?.user1 };
//                 } else if (
//                   item?.user2ID === item?.user2?.username &&
//                   item?.user1ID === profile?.username
//                 ) {
//                   return { ...item?.user1 };
//                 } else if (
//                   item?.user1ID === item?.user1?.username &&
//                   item?.user2ID === profile?.username
//                 ) {
//                   return { ...item?.user1 };
//                 }
//               });
//               dispatch(setUserSearch(temp?.filter(Boolean)));
//               setShowResults(temp?.filter(Boolean)?.length > 0);
//             } else {
//               dispatch(setUserSearch(response.data.searchUsers.items));
//               setShowResults(response.data.searchUsers.items?.length > 0);
//             }

//             setSelectedCategoryOpen(false);
//             setCalenderOpen(false);
//           }
//         } catch (error) {
//           console.log("response error", error);
//         }
//       },
//       500 // Milliseconds to wait before executing the debounced function
//     ),
//     []
//   );

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setSearchTerm(value);
//     if (internalFilter) {
//       let filteredData = filterItems.filter((item) => {
//         return (
//           item?.title?.toLowerCase().includes(value?.toLowerCase()) ||
//           item?.description?.toLowerCase().includes(value?.toLowerCase()) ||
//           item?.userID?.toLowerCase().includes(value?.toLowerCase())
//         );
//       });

//       dispatch(setFilterItems(value.length > 0 ? filteredData : filterItems));

//       return;
//     }

//     if (value.length > 0) {
//       handleSearch(
//         value?.toLowerCase(),
//         selectedCategory,
//         startDate,
//         endDate,
//         dateSelected
//       );
//       setShowResults(true);
//     } else {
//       setShowResults(false);
//     }
//   };

//   // console.log("showResults", userSearch);

//   // useEffect(() => {
//   //   if (transcript && !isGeneral && !isEmoji) {
//   //     handleSearch(
//   //       transcript.toLowerCase(),
//   //       selectedCategory,
//   //       startDate,
//   //       endDate,
//   //       dateSelected
//   //     );
//   //     setSearchTerm(transcript);
//   //     if (transcript.length > 0) {
//   //       setShowResults(true);
//   //     } else {
//   //       setShowResults(false);
//   //       dispatch(setUserSearch([]));
//   //     }
//   //   }
//   // }, [transcript]);
//   const emptySearch = () => {
//     setSearchTerm("");
//     setShowResults(false);
//     setSelectedCategoryOpen(false);
//     setCalenderOpen(false);
//     setDateSelected(false);
//   };

//   useEffect(() => {
//     router.events.on("routeChangeStart", emptySearch);
//     return () => {
//       router.events.off("routeChangeStart", emptySearch);
//     };
//   }, []);

//   const handleSelect = (ranges) => {
//     setStartDate(ranges.selection.startDate);
//     setEndDate(ranges.selection.endDate);
//     setDateSelected(true);
//   };
//   useEffect(() => {
//     const selectionRange = {
//       startDate,
//       endDate,
//       key: "selection",
//     };

//   }, []);
//   return (
//     <>
//       <div
       
//         className="h-10 relative mb-3 mt-1 xs:w-full"
//       >
//         {isSearch && (
//           <div className="absolute  top-[10px] left-[10px] ">
//             <Image
//               width={44}
//               height={44}
//               src="/icons/search.svg"
//               alt="search icon"
//               className=" w-6 h-6 m-0 "
//             />
//           </div>
//         )}
//         <input
//           type="text"
//           placeholder={placeholder}
//           // onChange={handleInputChange}
//           // onFocus={() => {
//           //   setPlaceholder("");
//           //   setIsSearch(true);
//           // }}
//           // onBlur={() => {
//           //   if (searchTerm === "") setPlaceholder("Search...");
//           //   setIsSearch(false);
//           //   setTimeout(() => {
//           //     setShowResults(false);
//           //   }, 1500);
//           // }}
//           // onKeyDown={(e) => handleKeyPress(e)}
//           value={searchTerm}
//           className={`${isSearch
//             ? "lg:Search-Input1 Search-Input-Sm1"
//             : "lg:Search-Input Search-Input-Sm "
//             }  z-50 transition ease-in-out duration-300 `}
//         />
//         {/* mic */}

//         {/* <div className=" rounded-full cursor-pointer   absolute  right-2 top-2  ">
//           <Mic
//             onStart={() => {
//               dispatch(setSearchMic());
//               SpeechRecognition.startListening();
//             }}
//             onStop={SpeechRecognition.stopListening}
//             listening={listening}
//           />
//         </div> */}
//         {/* category text */}
//         {/* <div
//           // onClick={() => setSelectedCategoryOpen(!selectedCategoryOpen)}
//           className=" cursor-pointer absolute  right-12 top-1/2 -translate-y-1/2 flex"
//         >
//           <p className="main-text text-lg hover:scale-110 transition ease-in-out duration-300 hover:text-[#FFF80E] hover:brightness-125 yellow-text">
//             {" "}
//             {/* {categoryList[selectedCategory]?.title} */}
//           </p>
//           {/* <span className="h-[48] w-[1px] bg-white ml-2"></span>
//         </div>  */}

//         {/* calender */}
//         {/* {categoryList[selectedCategory]?.title === "Events" && (
//           <div
//             onClick={() => setCalenderOpen(!calenderOpen)}
//             className="absolute  cursor-pointer right-20 pr-3 top-1/2 -translate-y-1/2"
//           >
//             <BiCalendarEvent color="#efe3facc" />
//           </div>
//         )} */}


//         {/* {!selectedCategoryOpen &&
//           categoryList[selectedCategory].title === "Recent" &&
//           userSearch.length === 0 &&
//           showResults ? (
//           <div
//             style={{
//               width: isMobile ? "100%" : 300,
//               maxWidth: isMobile ? "100%" : 300,
//               maxHeight: 500,
//               // left: isMobile ? 0 : "69%",
//               // marginTop: isMobile ? 91 : 20,
//             }}
//             className={`SearchToolTip__ToolTipWrapper overflow-y-auto mdl:block !xs:block  !bg-[rgba(15, 14, 71, 0.8)]  
//           searchInput w-full `}
//           >
//             <>
//               <div className="SearchToolTip__TextWrapper flex justify-between relative">

//                 <p className="main-text">
//                   Search for {categoryList[selectedCategory]?.title}
//                 </p>
//                 <CloseButton handleClose={emptySearch} />
//               </div>{" "}
//               <div className="flex items-center justify-center text-[#fff] font-bold flex-col gap-8">
//                 <AiOutlineFileSearch size={48} color="#fff" />
//                 <p>No recent search</p>
//               </div>
//             </>
//           </div>
//         ) : (
//           (calenderOpen ||
//             selectedCategoryOpen ||
//             (userSearch?.length > 0 && showResults)) && (
//             <div
//               style={{
//                 width: isMobile ? "100%" : 300,
//                 maxWidth: isMobile ? "100%" : 300,
//                 maxHeight: 500,

//                 marginTop: isMobile ? 91 : 3,
//               }}
//               className={`SearchToolTip__ToolTipWrapper overflow-y-auto mdl:block !xs:block  !bg-[rgba(15, 14, 71, 0.8)]  
//             searchInput `}
//             >
//               {!calenderOpen &&
//                 showResults &&
//                 !selectedCategoryOpen &&
//                 userSearch &&
//                 userSearch.length > 0 ? (
//                 <>
//                   <div className="SearchToolTip__TextWrapper flex justify-between ">
//                     <p className="main-text">
//                       Search for {categoryList[selectedCategory]?.title}
//                     </p>
//                     <CloseButton handleClose={emptySearch} />
//                   </div>
//                   <div className="SearchToolTip__LinksWrapper">
//                     {!userSearch?.length ? (
//                       <a className="SearchTooltipRow__MyLink -z-[1]">
//                         <div className="SearchTooltipRow__Wrapper w-full">
//                           <div className="SearchTooltipRow__LogoWrapper">
//                             <div className="lazyload-wrapper w-20 h-20 rounded-full">
//                               {/* <Image
//                                 src={boy}
//                                 width={48}
//                                 height={48}
//                                 className="w-20 h-20 cover rounded-full"
//                                 alt="Image"
//                               /> */}
//                             </div>
//                           </div>

//                           <p className=" SearchTooltipRow__Type text-xl main-text">
//                             Search for users
//                           </p>
//                         </div>
//                       </a>
//                     ) : (
//                       userSearch?.map((item, index) => (
//                         <div
//                           key={index}
//                           onClick={() => {
//                             console.log("CONSOLE>", { item: item.id });
//                             // handleRedirectUrl(item.id);
//                           }}
//                           style={{ zIndex: 999999999 }}
//                         >
//                           <SearchRow
//                             key={item.id}
//                             searchTerm={searchTerm}
//                             selectedUser={selectedUser}
//                             selectedCategory={categoryList[selectedCategory]}
//                             handleRedirectUrl={handleRedirectUrl}
//                             item={item}
//                             index={index}
//                           />
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </>
//               ) : null}

//               {userSearch?.length === 0 &&
//                 !selectedCategoryOpen &&
//                 !calenderOpen && (
//                   <div className="SearchToolTip__TextWrapper ">
//                     <p className="main-text">No Result</p>
//                     <div className={styles.SearchToolTip__Separator} />
//                   </div>
//                 )}

//               {selectedCategoryOpen && !calenderOpen && (
//                 <>
//                   <SearchCategories
//                     setSelectedCategoryOpen={setSelectedCategoryOpen}
//                     setSelectedCategory={setSelectedCategory}
//                     emptySearch={emptySearch}
//                     setUserSearch={setUserSearch}
//                     categoryList={categoryList}
//                     setNextToken={setNextToken}
//                     selectedCategory={selectedCategory}
//                   />
//                 </>
//               )}

//               {calenderOpen && (
//                 <div className=" ">
//                   <DateRange
//                     ranges={[selectionRange]}
//                     onChange={handleSelect}
//                     moveRangeOnFirstSelection={true}
//                     rangeColors={["rgba(15, 14, 71, 0.8)"]}
//                   />

//                   <div className="flex  justify-between">
//                     <button
//                       onClick={() => {
//                         handleSearch(
//                           "",
//                           selectedCategory,
//                           startDate,
//                           endDate,
//                           dateSelected
//                         );
//                         setShowResults(true);
//                       }}
//                       className="focus:outline-none text-white  bg-darkBlue mt-2 hover:bg-purple-800 hover:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
//                     >
//                       Apply
//                     </button>
//                     {dateSelected && (
//                       <button
//                         onClick={() => {
//                           setStartDate(new Date());
//                           setEndDate(new Date());
//                           setDateSelected(false);
//                         }}
//                         className="focus:outline-none text-white  bg-darkBlue mt-2 hover:bg-purple-800 hover:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
//                       >
//                         Remove Dates
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//           )
//         )} */}
//       </div>
//     </>

//   );
// };
// export default memo(Search);
