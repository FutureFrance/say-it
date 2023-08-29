'use client'

import { useDebounce } from "@/hooks/useDebounce";
import { SearchUsersResponse, searchUsers } from "@/services/user.service";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { ChangeEvent, useEffect, useState } from "react";
import SearchUsersModal from "../modals/searchUsersModal";
import PopUpMessage from "../ui/errors/popUpMessage";

const SearchPeopleInput = ({ session }: { session: Session }) => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchUsersResponse>([]);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    getSearchList();
  }, [debouncedValue]);

  useEffect(() => {
    if (query.length > 0) setShowSearchModal(true);
  }, [query]);

  const getSearchList = async () => {
    if (query.length > 0) {
      try {
        setIsLoading(true);

        const response = await searchUsers(session.accessToken, query);

        setIsLoading(false);
        setSearchResults(response.data);
      } catch(err) {
        if (err instanceof AxiosError) setApiError(err.response?.data.message);
      }
    }
  }

  const handleSearchBoxTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 25 ) setQuery(e.target.value);
  }

  return (
    <div 
      id="searchInputArea" 
      className="pr-4 flex gap-2 items-center bg-[#16181c] select-none rounded-full relative border border-[black] focus:border-light_blue focus:outline-none focus:ring focus:border-light_blue"
    >
      <div className="pl-4 w-[10%]">
        <img src="/assets/search_icon.png" alt="" />
      </div>

      <input
        name="search_people_input"
        value={query}
        placeholder="Search People"
        onChange={(e) => handleSearchBoxTyping(e)}
        onFocus={() => setShowSearchModal(true)}
        className={`text-md font-normal text-white_text bg-[#16181c] rounded-r-full p-4 focus:outline-none ${query.length > 1 ? 'w-[80%]' : 'w-[90%]'}`}
      />

      <div 
        id="deleteSearchResultIcon"
        className={`${(showSearchModal && query.length > 0) ? '' : 'hidden'} w-[10%] py-[2px] px-[1px] bg-sky-600 rounded-full flex items-center justify-center cursor-pointer`}
      >
        <p>x</p>
      </div>    
    
      { showSearchModal && 
        <SearchUsersModal 
          query={query}
          setQuery={setQuery}
          searchResults={searchResults} 
          setShowSearchModal={setShowSearchModal}
          isLoading={isLoading}
        />
      } 

      { apiError && 
        <PopUpMessage 
          success={true}
          text={apiError} 
          setText={setApiError}       
          textColor="rose-400"
        />
      }
    </div>
  )
}

export default SearchPeopleInput;