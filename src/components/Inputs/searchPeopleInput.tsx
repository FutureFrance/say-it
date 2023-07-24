'use client'

import { useState } from "react";

const SearchPeopleInput = () => {
  const [value, setValue] = useState<string>("");
  
  return (
    <div className="h-[100%] w-[100%] flex gap-2 items-center bg-[#16181c] rounded-full">
      <div className="pl-4 w-[100%] h-[100%]">
        <img className="w-4 h-4" src="/assets/search_icon.png" alt="" />
      </div>
      <input
        name="search_people_input"
        value={value}
        placeholder="Search People"
        onChange={(e) => setValue(e.target.value)}
        className="text-md font-normal text-zinc-500 bg-[#16181c] rounded-r-full p-4 focus:outline-none" 
      />
    </div>
  )
}

export default SearchPeopleInput;