'use client'

import { SearchUsersResponse } from "@/services/user.service";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import Link from "next/link";
import Loading from "@/app/loading";
import NoDataInfo from "../ui/informative/noDataInfo";

type Props = {
  query: string;
  searchResults: SearchUsersResponse;
  setShowSearchModal: Dispatch<SetStateAction<boolean>>;
  setQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

const SearchUsersModal = ({ query, searchResults, setShowSearchModal, setQuery, isLoading }: Props) => {
  useEffect(() => {    
    const modal = document.getElementById('modal');
    const searchInputArea = document.getElementById('searchInputArea');
    const deleteSearchQuery = document.getElementById('deleteSearchResultIcon');
    
    modal?.addEventListener('click', memoizedModalClick);
    searchInputArea?.addEventListener('click', memoizedModalClick); 
    deleteSearchQuery?.addEventListener('click', memoizedDeleteSearchResultClick);

    document.addEventListener('click', memoizeDocumentClick);

    return () => {
      console.log(deleteSearchQuery)
      modal?.removeEventListener('click', memoizedModalClick);
      searchInputArea?.removeEventListener('click', memoizedModalClick);
      deleteSearchQuery?.removeEventListener('click', memoizedDeleteSearchResultClick);

      document.removeEventListener('click', memoizeDocumentClick);
    }
  }, []);

  const documentClick = () => setShowSearchModal(false);
  const modalClick = (event: MouseEvent) => event.stopPropagation();
  const deleteSearchResultClick = () => setQuery("");

  const memoizedModalClick = useCallback(modalClick, [])
  const memoizeDocumentClick = useCallback(documentClick, []);
  const memoizedDeleteSearchResultClick = useCallback(deleteSearchResultClick, []);

  return (
    <div 
      id="modal"
      className={`absolute bottom-0 overflow-y-auto z-10 bg-[black] ${query.length > 0 ? 'h-[70vh]' : 'h-[100px]'} w-full translate-y-[101%] rounded-lg`}
      style={{ boxShadow: "0 0 12px rgba(175, 175, 175, 0.5)" }}
    >
      { query.length === 0 
        ? <p className="text-center text-[15px] text-[#5A5A5A] mt-4">Try searching for people, lists, or keywords</p> 
        : (
          <>
            <div className="flex items-center pl-4 break-word h-12 text-[15px] border-b-2 border-zinc-800 text-white_text transition duration-200 ease-in hover:bg-hover_search_user">
              <p className="break-word">Search for "{query}"</p> 
            </div>

            <div className="h-[90%]">
              {
                searchResults.length > 0 
                  ? searchResults.map(result => {
                      return (
                        <Link href={`/user/${result.id}`} prefetch={false} key={result.username}>
                          <div className="flex p-4 gap-2 items-center max-h-24 hover:bg-hover_search_user">
                            {
                            <>
                                <img className="w-12 h-12 rounded-full" src={result.avatar} alt="" />

                                <div className="flex flex-col justify-center">
                                  <p className="text-white_text font-semibold">{result.name}</p>
                                  <p className="text-zinc-500">@{result.username}</p>
                                </div>
                              </> 
                            }
                          </div>
                        </Link>
                      )
                    })
                  : (
                    <div className="flex items-center justify-center text-[white] h-full">
                      <NoDataInfo text="Oops, No such user found"/>
                    </div>
                  ) 
              }
            </div>
          </>
        )
      }
      {isLoading && <div><Loading /></div>}
    </div>
  )
}

export default SearchUsersModal;