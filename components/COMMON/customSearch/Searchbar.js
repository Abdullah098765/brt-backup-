import { useState } from "react";
import { FaSearch, FaRegUser } from "react-icons/fa";


const Searchbar = ({placeholder}) => {

    return (
       <div className="relative flex items-center w-full min-w-full mb-2">
          <div className="absolute top-3 left-2">
            <FaSearch className="w-5 h-5 white-text"/>
          </div>
          <input 
        //   value={searchQuery}
        //   onChange={(e) => setSearchQuery(e.target.value)}
          className="search-dark w-[80%] card-bg" 
          placeholder={placeholder} 
          />
          <div className="absolute top-0 right-2 card-bg h-[40px] w-12 rounded-lg flex justify-center items-center text-center p-2">
            <FaRegUser className="w-5 h-5 white-text"/>
          </div>
        </div>
    )
}

export default Searchbar;