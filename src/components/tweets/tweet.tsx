'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Session } from "next-auth"
import { AxiosError } from "axios";
import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";
import TweetMedia from "./media/tweetMedia";
import { usePathname, useRouter } from "next/navigation";
import PopUpMessage from "../ui/errors/popUpMessage";
import { deleteTweet } from "@/services/tweets.client.service";
import ActionWarningModal from "../modals/actionWarningModal";

type Props = {
  session: Session;
  tweet: ITweet;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
}

export const Tweet = ({ session, tweet, setTweets }: Props) => {
  const [showMyTweetSettings, setShowMyTweetSettings] = useState<boolean>(false);
  const [showForeignTweetSettings, setShowForeignTweetSettings] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<null | string>(null);
  const [warningModal, setWarningModal] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const leftMedia: Array<IMedia> = [];
  const rightMedia: Array<IMedia> = [];

  tweet.media.forEach((media, index) => {
    if (index % 2 === 0) {
      leftMedia.push(media);
    } else {
      rightMedia.push(media);
    }
  });

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/user/${session.user.username}`);
  }

  const handleTweetSettingsClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (tweet.user.username === session.user.username) setShowMyTweetSettings(true);
    else setShowForeignTweetSettings(true);
  }

  const handleDeleteTweet = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      await deleteTweet(session.accessToken, tweet.id);
      //  not getting the message after the deletion with that second modal
      setApiMessage("You're tweet was deleted");
      setTweets(prev => prev.filter(element => element.id !== tweet.id ));
      
      console.log("asdfasdfasdf", pathname.split('/'))
      if (pathname.split('/')[1] === "tweet") router.push("/feed");
    } catch(err) {
      if (err instanceof AxiosError) setApiMessage("Could not delete this tweet, please try again later");
    }
  }

  return (
    <div 
      className="tweet pr-8 p-2 flex max-h-[550px] cursor-pointer" 
      onClick={() => router.push(`/tweet/${session.user.username}/${tweet.id}`)}
    >
      <TweetOwnerAvatar user={tweet.user}/> 
      
      <div className="tweet_content w-[100%] cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="owner_content flex gap-2 items-center max-w-fit" onClick={e => handleUserClick(e)}>
            <p className="font-semibold text-md">{tweet.user.name} &nbsp;</p>
    
            <p className="text-md text-zinc-300">@{tweet.user.username}</p>
            <div className="bg-[gray] rounded-full h-[2px] w-[2px]"></div>
        
            <p className="text-sm text-zinc-300">{tweet.timestamp_diff}</p>
          </div>
          <div className="relative">
            <img
              onClick={handleTweetSettingsClick} 
              className="w-4 h-4" 
              src="/assets/app_menu/menu_dots_icon.png" 
              alt="" 
            />

            { (showMyTweetSettings || showForeignTweetSettings) && 
              <div className="absolute bg-[black] top-0 right-0 rounded-lg w-64 z-20" style={{ boxShadow: "0 0 12px rgba(175, 175, 175, 0.5)" }}>
                { showMyTweetSettings && 
                  <div 
                    className="flex gap-4 items-center px-4 py-2 hover:bg-hover_tweet_gray"
                    onClick={(e) => { setWarningModal(true); e.preventDefault(); e.stopPropagation()}}
                  >
                    <img className="h-[18px]" src="/assets/trash_icon.png" alt="" />
                    <span className="text-warning_red text-[15px] font-medium">Delete</span>
                  </div>
                }
                {
                  showForeignTweetSettings &&
                  <div>
                    {/* foreign tweet settings */}
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <div className='mb-2'>
          <p className="font-[375] text-md">{tweet.text_body}</p>
        </div>

        {tweet.media.length > 0 && 
          <TweetMedia 
            tweet={tweet} 
            leftMedia={leftMedia} 
            rightMedia={rightMedia}
          /> 
        }
        <TweetStatistics fetchedTweet={tweet} session={session}/>
      </div>
      { apiMessage && 
        <PopUpMessage 
          text={apiMessage}
          setText={setApiMessage}
        />
      }

      {warningModal && 
        <ActionWarningModal 
          setWarningModal={setWarningModal}
          mainWarningText="Delete post?"
          warningText="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results."
          actionText="Delete"
          onClickAction={handleDeleteTweet}
        />
      }
    </div>
  )
}

export default Tweet;
