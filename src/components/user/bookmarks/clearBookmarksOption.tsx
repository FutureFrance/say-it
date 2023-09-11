'use client'

import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";

type Props = {
  setShowBookmarksSettings: Dispatch<SetStateAction<boolean>>;
  setWarningModal: Dispatch<SetStateAction<boolean>>;
}

const ClearBookmarksOption = ({ setShowBookmarksSettings, setWarningModal }: Props) => {
  const outsideClickHandler = useCallback((e: MouseEvent) => {
    // e.stopImmediatePropagation();
    setShowBookmarksSettings(false);
  }, []);

  const clearBookmarksOptionHandler = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setWarningModal(true);
  }, []);

  useEffect(() => {
    document.addEventListener('click', outsideClickHandler);

    const clearBookmarksDiv = document.getElementById("clear_bookmarks_settings_option");

    clearBookmarksDiv?.addEventListener('click', clearBookmarksOptionHandler);

    return () => {
      document.removeEventListener('click', outsideClickHandler);

      clearBookmarksDiv?.removeEventListener('click', clearBookmarksOptionHandler);
    }
  }, []);
  
  return (
    <div 
      id="clear_bookmarks_settings_option"
      className="flex gap-2 items-center px-4 py-2 hover:bg-hover_tweet_gray pointer-events-auto"
    >
      <img className="h-[18px]" src="/assets/trash_icon.png" alt="" />
      <span className="font-semibold text-[15px] text-warning_red">Delete all Bookmarks</span>
    </div>
  )
}

export default ClearBookmarksOption;