'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import DeleteOption from "./tweetSettingsOptions/ownTweetsOptions/deleteOption";
import ConnectionActionOption from "./tweetSettingsOptions/othersTweetsOptions/connectionAction";
import { WARNING_MODALS } from "@/constants/global.constants";
import { Session } from "next-auth";

type Props = {
  showMyTweetSettings: boolean;
  showForeignTweetSettings: boolean;
  setShowForeignTweetSettings: Dispatch<SetStateAction<boolean>>;
  setShowMyTweetSettings: Dispatch<SetStateAction<boolean>>;
  setWarningModalType: Dispatch<SetStateAction<WARNING_MODALS>>;
  setWarningModal:  Dispatch<SetStateAction<boolean>>;
  tweet: ITweet;
  session: Session;
}

const TweetSettingsOptions = ({ 
  showMyTweetSettings, 
  showForeignTweetSettings, 
  setShowMyTweetSettings,
  setShowForeignTweetSettings,
  setWarningModal,
  setWarningModalType,
  tweet, 
  session,
}: Props) => {
  const onOutsideClick = useCallback((e: MouseEvent) => {
    e.stopImmediatePropagation();

    if (showForeignTweetSettings) setShowForeignTweetSettings(false);
    else setShowMyTweetSettings(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutsideClick);

    return () => {
      document.removeEventListener('click', onOutsideClick);
    }
  }, []);

  return (
    <div 
      className="absolute bg-[black] top-0 right-0 rounded-lg w-64 z-20 cursor-pointer" 
      style={{ boxShadow: "0 0 12px rgba(175, 175, 175, 0.5)" }}
      id="settings_options"
    >
      { showMyTweetSettings && 
        <DeleteOption 
          setWarningModal={setWarningModal}
          setWarningModalType={setWarningModalType}
        /> 
      }
      { showForeignTweetSettings &&
        <ConnectionActionOption 
          session={session}
          tweet={tweet} 
          setShowForeignTweetSettings={setShowForeignTweetSettings}
        />
      } 
    </div>
  )
}

export default TweetSettingsOptions;