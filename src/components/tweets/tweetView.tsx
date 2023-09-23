'use client'

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import TweetMedia from "./media/tweetMedia";
import TweetStatistics from "./tweetStatistics";
import TweetSettings from "./tweetSettings";
import UserThoughtsInput from "../user/userThoughtsInput";
import { TweetContext } from "@/context/tweetContext";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { initializeTweetsStatistics } from "@/redux/features/tweetStatisticsSlice";

type Props = {
  session: Session;
  tweet: ITweet;
}

const TweetView = ({ session, tweet }: Props) => {
  const { setTweets } = useContext(TweetContext);

  const tweetsStats = useAppSelector(state => state.persistedReducer.tweets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tweetsStats[tweet.id] === undefined) { 
      dispatch(initializeTweetsStatistics({ initialTweetsStats: [tweet] })); 
    }
  }, []); 

  return (
    <article className="px-4 mt-[12px]">
      <div className="flex justify-between">
        <div className="flex">
          <TweetOwnerAvatar user={tweet.user} />
          
          <Link href={`/user/${tweet.user.username}`} prefetch={false}>
            <div className="text-[15px] leading-5 cursor-pointer">
              <div><span className="font-bold hover:underline">{tweet.user.name}</span></div>
              <div><span className="text-zinc-500 font-normal">@{tweet.user.username}</span></div>
            </div>
          </Link>
        </div>

        <TweetSettings 
          session={session}
          tweet={tweet}
          setTweets={setTweets}
        />
      </div>

      <div className="flex items-center min-h-[40px]">
        <span className="text-[17px] leading-6 font-normal">{tweet.text_body}</span>
      </div>

      <div className="mb-[12px]">
        {tweet.media.length > 0 && 
          <TweetMedia tweet={tweet} /> 
        }
      </div>

      <TweetStatistics 
        fetchedTweet={tweet} 
        session={session}
        individualTweet={true}
        iconSpacing="justify-around"
      />

      <div className="border w-[100%] border-zinc-800 mb-2"></div>

      <UserThoughtsInput 
        session={session}
        inputId="reply_mode_to_tweets"
        parentTweet={tweet}
        buttonText="Reply"
        inputPlaceholder="Post a Reply"
      />
    </article>
  )
}

export default TweetView;