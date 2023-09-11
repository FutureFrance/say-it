'use client'

import { Session } from "next-auth";
import { Dispatch, SetStateAction, useState } from "react";
import ClearBookmarksOption from "./clearBookmarksOption";
import ActionWarningModal from "@/components/modals/actionWarningModal";
import { deleteBookmarks } from "@/services/user.service";
import { ITweet } from "@/interfaces/tweets/tweet.interface";

type Props = {
  session: Session;
  setTweets?: Dispatch<SetStateAction<Array<ITweet>>>;
  bookmarksNumber: number; 
}

const StickyBookmarkTitle = ({ session, bookmarksNumber }: Props) => {
  const [showBookmarksSettings, setShowBookmarksSettings] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);

  const handleDeleteBookmarksClick = async () => {
    try {
      await deleteBookmarks(session.accessToken);

      // setTweets([]);
      setWarningModal(false);
    } catch(err) {}
  }

  return (
    <>
      <div className="flex justify-between pt-[10px] z-10 sticky top-0 bg-black bg-opacity-75 backdrop-blur-[1px] relative">
        <div className="flex flex-col pl-4">
          <span className="text-xl font-bold leading-5">Bookmarks</span>
          <span className="font-normal text-sm text-zinc-500">@{session.user.username}</span>
        </div>

        {bookmarksNumber != 0 &&
          <div 
            className="w-[34px] h-full flex items-center justify-end cursor-pointer mr-4"
            onClick={() => setShowBookmarksSettings(true)}
          >
            <img className="w-[20px]" src="/assets/app_menu/menu_dots_icon.png" alt="" />
          </div>
        }

        {showBookmarksSettings &&
          <div 
            className="absolute bg-[black] top-2 right-0 rounded-lg w-64 z-20 cursor-pointer"
            style={{ boxShadow: "0 0 12px rgba(175, 175, 175, 0.5)" }}
          >
            <ClearBookmarksOption 
              setShowBookmarksSettings={setShowBookmarksSettings}
              setWarningModal={setWarningModal}
            />
          </div>
        }
      </div>

      { warningModal &&
        <ActionWarningModal 
          mainWarningText="Clear all Bookmarks?"
          warningText="This can’t be undone and you’ll remove all posts you’ve added to your Bookmarks."
          actionText="Clear"
          setWarningModal={setWarningModal}
          onClickAction={handleDeleteBookmarksClick}
        />
      }
    </>
  )
}

export default StickyBookmarkTitle;