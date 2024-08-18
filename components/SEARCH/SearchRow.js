import { useRef } from "react";
import Image from "next/image";
import { imageUrl, videoUrl } from "../../utils/url";
// import { highlightSearchResults } from "../../utils/utils";


function SearchRow(props) {
  const videoRef = useRef(null);
  const playOnMouseEnter = () => {
    videoRef.current.play();
  };
  const pauseOnMouseLeave = () => {
    videoRef.current.pause();
  };

  return (
    <div
      onClick={() => props.handleRedirectUrl(props.item?.id)}
      style={
        props.selectedUser === props.index
          ? {
              background: "rgba(255, 255, 255, 0.1)",
            }
          : {}
      }
      className={`SearchTooltipRow__MyLink flex items-center rounded-xl  -z-[1]`}
    >
      <div className="SearchTooltipRow__Wrapper w-full cursor-pointer">
        <div className="SearchTooltipRow__LogoWrapper">
          <div className="lazyload-wrapper !w-16 !h-16 pt-3">
            <Image
              className={`rounded-full !w-16 !h-16`}
              src={
                props.item?.picture?.includes("https://")
                  ? props.item?.picture
                  : props.item.picture
                  ? imageUrl(props.item.picture)
                  : props?.item?.gender === "female"
                  ? girl
                  : boy
              }
              alt={"user"}
              width={150}
              height={150}
              style={{
                objectFit: "cover",
              }}
            />
            <figure className="mr-5 self-start cursor-pointer mt-[-55px]">
              <div className="w-16 h-16 shadow-sm col-span-1  relative">
                {props?.item?.isOnline ? (
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
          </div>
        </div>
        <div className="flex max-h-28 -mt-2">
          <div>
            <div className="SearchTooltipRow__TextWrapper ml-10 ">
              <h3 className="main-text2 text-left mb-0  font-semibold  text-2xl lg:tracking-wider">
                {highlightSearchResults(
                  props.searchTerm,
                  props.item?.title?.slice(0, 14) ||
                    props.item?.username?.slice(0, 7)
                )}
              </h3>
              <h4 className="main-text2 text-left mb-0  font-semibold  text-xl lg:tracking-wider lg:hidden xs:block">
                {props.item?.firstName + " " + props.item?.lastName}
              </h4>
              <span className="main-text text-left block text-md xs:hidden lg:inline-flex">
                {props.selectedCategory?.title === "Users"
                  ? props.item?.firstName
                    ? "Name: " +
                      props.item?.firstName.slice(0, 8) +
                      " " +
                      props.item?.lastName.slice(0, 9)
                    : "Name: Private"
                  : props.item?.username}
              </span>
              <div className="-mt-2">
                <span className="text-jacarta-300 main-text text-left block text-sm">
                  Wins: {props.item?.wins || 1}
                </span>
              </div>
            <div className="-mt-2">
                <span className="text-jacarta-300 main-text text-left block text-sm">
                  Level: {props.item?.level || 1}
                </span>
              </div>
            </div>
          </div>

          {props.item?.banner && (
            <div className="flex  w-full  flex-1 justify-end">
              <div className="lazyload-wrapper w-full h-full relative bg-darkBrown ">
                <Image // className={`rounded-full`}
                  src={imageUrl(props.item.banner)}
                  alt={"user"}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}

          {props.item.video && (
            <div
              onMouseEnter={playOnMouseEnter}
              onMouseLeave={pauseOnMouseLeave}
              className="flex  w-full  flex-1 justify-end items-center cursor-pointer"
            >
              <div className="lazyload-wrapper w-full  h-16 relative bg-darkBrown ">
                <video
                  ref={videoRef}
                  className="w-full h-full  object-cover"
                  src={videoUrl(props.item.video)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchRow;
