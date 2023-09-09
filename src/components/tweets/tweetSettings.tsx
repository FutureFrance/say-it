'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TweetSettingsOptions from "./tweetSettingsOptions";

type Props = {
  session: Session;
  tweet: ITweet;
  setWarningModal: Dispatch<SetStateAction<boolean>>;
}

const TweetSettings = ({ session, tweet, setWarningModal }: Props) => {
  const [showMyTweetSettings, setShowMyTweetSettings] = useState<boolean>(false);
  const [showForeignTweetSettings, setShowForeignTweetSettings] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleTweetSettingsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (tweet.user.username === session.user.username) setShowMyTweetSettings(true);
    else setShowForeignTweetSettings(true);
  }

  return (
    <div className="relative cursor-pointer">
      <div 
        className="flex flex-col justify-start rounded-full hover:bg-hover_tweet_settings hover:opacity-80"
        onClick={handleTweetSettingsClick} 
      >
        <img 
          className="w-4 h-4 opacity-70 rounded-lg" 
          src="/assets/app_menu/menu_dots_icon.png" 
          alt="" 
          style={{ boxShadow: `${isHovered ? '0px 0px 0px 10px rgba(22, 113, 174, 0.4)' : ''}` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />

        { (showMyTweetSettings || showForeignTweetSettings) && 
          <TweetSettingsOptions 
            showForeignTweetSettings={showForeignTweetSettings}
            showMyTweetSettings={showMyTweetSettings}
            setShowForeignTweetSettings={setShowForeignTweetSettings}
            setShowMyTweetSettings={setShowMyTweetSettings}
            setWarningModal={setWarningModal}
            tweet={tweet}
          />
        }
      </div>
    </div>
  )
}

export default TweetSettings;