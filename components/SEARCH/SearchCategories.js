import { memo } from "react";
import styles from "../TabComp/styles/Tabcomp.module.css";
import { useDispatch } from "react-redux";
import { setVideoChallengeSelectedStatus } from "../../redux/videoChallengeSlice";
import CloseButton from "../Common/buttons/CloseButton";
function SearchCategories({
  setSelectedCategory,
  setSelectedCategoryOpen,
  setUserSearch,
  categoryList,
  setNextToken,
  selectedCategory,
  emptySearch
}) {
  const dispatch = useDispatch();
  return (
    <>
      <div className=" flex gap-6 items-center text-[white]   text-center w-full relative">
        <div className="absolute -top-3 -right-4">
          <CloseButton handleClose={emptySearch} />
        </div>
        <div className="flex-col w-full">
          <p
            className="TextStyles__SmallText2-h7d1e3-13  not-italic font-semibold text-[15px] tracking-widest uppercase min-w-[140px] pb-2 text-center
         text-[rgba(255,255,255,0.5)] m-0 "
          >
            Choose Category
          </p>
          <div className={styles.SearchToolTip__Separator} />
        </div>
      </div>
      <div className="SearchToolTip__SearchWrapper-wbhl3p-">
        {categoryList?.map((item, index) => (
          <div
            onClick={() => {
              setSelectedCategory(index);
              setSelectedCategoryOpen(false);
              dispatch(setUserSearch([]));
              setNextToken && setNextToken(null);
              item.field === "searchVideoChallenges" &&
                dispatch(setVideoChallengeSelectedStatus(item?.status));
            }}
            key={index}
            className="yellow-text h-11 transition-[0.3s] duration-[ease-in-out] cursor-pointer p-2.5 rounded-[10px]; -
         webkit - transition: 0.3 s ease - in -out "
          >
            <div className=" text-start  flex items-center gap-4 py-3 px-1 main-text hover:bg-[#cdbbd54d] rounded-xl">
              {item?.icon({
                className: "w-7 h-7",
                color: index === selectedCategory ? "#cb9b51" : "#54C5FD",
              })}
              <p
                // style={{ color: index === selectedCategory ? "gold-text" : "" }}
                className={`${index === selectedCategory ? "gold-text text-[17px]" : "MenuRow__Title-sc"}  `}
              >
                {item?.title}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(SearchCategories);
