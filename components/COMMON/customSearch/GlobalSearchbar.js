import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const GlobalSearchbar = ({placeholder}) => {

    return (
       <div className="relative flex items-center w-full min-w-full h-16 mb-2 card-bg px-2 rounded-lg">
         
          <input 
        //   value={searchQuery}
        //   onChange={(e) => setSearchQuery(e.target.value)}
          className="search-dark w-[80%]" 
          placeholder={placeholder} 
          />
          <button className="absolute top-1 right-2 btn-purp h-14 w-14 rounded-lg flex justify-center items-center text-center p-2">
            <HiOutlineSearch className="w-7 h-7 white-text"/>
          </button>
        </div>
    )
}

export default GlobalSearchbar;