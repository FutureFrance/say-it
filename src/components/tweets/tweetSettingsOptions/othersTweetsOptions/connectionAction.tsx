'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { friendshipAction } from "@/services/friendship.service";
import { FriendshipActions } from "@/types/user.interface";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

type Props = {
  tweet: ITweet;
  session: Session;
  setShowForeignTweetSettings: Dispatch<SetStateAction<boolean>>;
}

const ConnectionActionOption = ({ session, tweet, setShowForeignTweetSettings }: Props) => {
  const handleConnectionClick = useCallback((e: MouseEvent) => { 
    e.stopPropagation(); 

    if (tweet.amIfollowingTweetOwner) handleUnfollowClick();
    else handleFollowClick();

    tweet.amIfollowingTweetOwner = !tweet.amIfollowingTweetOwner; console.log(tweet)
    setShowForeignTweetSettings(false);
  }, []);

  useEffect(() => {
    const connectionOption = document.getElementById("tweet_settings_connection_action_option");
    connectionOption?.addEventListener('click', handleConnectionClick);

    return () => {
      connectionOption?.removeEventListener('click', handleConnectionClick);
    }
  }, []);

  const handleFollowClick = async () => {
    try {
      await friendshipAction(session.accessToken, tweet.user.id, FriendshipActions.CREATE);
      
    } catch(err: any) {
      if (err instanceof AxiosError) console.log(err.response?.data.message);
    }
  }

  const handleUnfollowClick = async () => {
    try {
      await friendshipAction(session.accessToken, tweet.user.id, FriendshipActions.DESTROY);
      
    } catch(err: any) {
      if (err instanceof AxiosError) console.log(err.response?.data.message);
    }
  }

  return (
    <div 
      className="flex gap-2 items-center px-4 py-2 hover:bg-hover_tweet_gray"
      id="tweet_settings_connection_action_option"
    >
        {tweet.amIfollowingTweetOwner 
          ?
            <>
              <img className="h-[18px]" src="/assets/user_unfollow.png" alt="" />
              <span className="text-[15px] font-semibold">
                Unfollow @{tweet.user.username}
              </span>
            </>
          :
            <>
              <img className="h-[18px]" src="/assets/user_follow.png" alt="" />
              <span className="text-[15px] font-semibold">
                Follow @{tweet.user.username}
              </span>
            </>
        }
    </div>
  )
}

export default ConnectionActionOption;
