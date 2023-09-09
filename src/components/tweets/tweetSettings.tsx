'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useState } from "react";
import TweetSettingsOptions from "./tweetSettingsOptions";
import { deleteTweet } from "@/services/tweets.client.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { WARNING_MODALS } from "@/constants/global.constants";
import TweetsSettingsWarningModals from "./tweetSettingsWarningsModals";

type Props = {
  session: Session;
  tweet: ITweet;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
}

const TweetSettings = ({ session, tweet, setTweets }: Props) => {
  const [showMyTweetSettings, setShowMyTweetSettings] = useState<boolean>(false);
  const [showForeignTweetSettings, setShowForeignTweetSettings] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [warningModalType, setWarningModalType] = useState<WARNING_MODALS>(WARNING_MODALS.NONE);
  const [warningModal, setWarningModal] = useState<boolean>(false);

  const router = useRouter();

  const handleDeleteTweet = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      await deleteTweet(session.accessToken, tweet.id);

      setTweets(prev => prev.filter(element => element.id !== tweet.id ));
      setWarningModalType(WARNING_MODALS.NONE);
      
      const pathname = window.location.href.split('/');
      if (pathname.includes("tweet")) {
        // router.back(); 
        router.push('feed'); // momentarly pushing to feed until can't delete yet the tweets on my profile
      }
    } catch(err) {
      if (err instanceof AxiosError) console.log(err);
    }
  }

  const handleTweetSettingsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (tweet.user.username === session.user.username) setShowMyTweetSettings(true);
    else setShowForeignTweetSettings(true);
  }

  return (
    <div className="relative cursor-pointer" onClick={handleTweetSettingsClick} >
      <div className="flex flex-col justify-start rounded-full hover:bg-hover_tweet_settings hover:opacity-80">
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
            setWarningModalType={setWarningModalType}
            setWarningModal={setWarningModal}
            session={session}
            tweet={tweet}
          />
        }
      </div>
      
      {warningModal && 
        <TweetsSettingsWarningModals 
          setWarningModal={setWarningModal}
          warningModalType={warningModalType}
          handleDeleteTweet={handleDeleteTweet}
        />
      }
    </div>
  )
}

export default TweetSettings;