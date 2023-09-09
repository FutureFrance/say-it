'use client'

import { Session } from "next-auth";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import React, { useCallback, useContext } from "react";
import TweetMedia from "./media/tweetMedia";
import TweetStatistics from "./tweetStatistics";
import TweetSettings from "./tweetSettings";
import UserThoughtsInput from "../user/userThoughtsInput";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { TweetContext } from "@/context/tweetContext";

type Props = {
  session: Session;
  tweet: ITweet;
}

const TweetView = ({ session, tweet }: Props) => {
  const { setTweets } = useContext(TweetContext);

  const tweetLikeCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.likes_count || tweet.likes_count);
  const tweetRepliesCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.replies_count || tweet.replies_count);
  const tweetViewsCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.replies_count || tweet.views_count);

  const formatDate = useCallback((inputDate: Date): string => {
    const timeString = inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const monthString = inputDate.toLocaleString('default', { month: 'short' });
    const dayOfMonth = inputDate.getDate();
    const year = inputDate.getFullYear();

    return `${timeString} · ${monthString} ${dayOfMonth}, ${year} ·`;
  }, []);

  return (
    <article className="px-4 mt-[12px]">
      <div className="flex justify-between">
        <div className="flex">
          <TweetOwnerAvatar user={tweet.user} />
          
          <Link href={`/user/${tweet.user.username}`} prefetch={false}>
            <div className="text-[15px] leading-5 cursor-pointer">
              <div><span className="font-semibold">{tweet.user.name}</span></div>
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

      <div className="flex items-center min-h-[40px] text-[15px] leading-5 text-[white] gap-[4px] font-normal">
        <time className="hover:underline text-zinc-500" dateTime={tweet.created_at}>{formatDate(new Date(tweet.created_at))}</time>

        <div>
          <span className="font-semibold">{tweetViewsCount}</span>
          <span className="hover:underline text-zinc-500 ml-[4px] font-normal">Views</span>
        </div>
      </div>

      <div className="border w-[100%] border-zinc-800"></div>

      <div className="flex items-center h-[45px] text-sm font-normal gap-4">
        <div className="cursor-pointer">
          <span className="font-semibold">{tweetRepliesCount}</span>
          <span className="hover:underline text-zinc-500 ml-[4px]">Replies</span>
        </div>

        <div className="cursor-pointer">
          <span className="font-semibold">{tweetLikeCount}</span>
          <span className="hover:underline text-zinc-500 ml-[4px]">Likes</span>
        </div>

        <div className="cursor-pointer">
          <span className="font-semibold">500</span>
          <span className="hover:underline text-zinc-500 ml-[4px]">Bookmarks</span>
        </div>
      </div>

      <div className="border w-[100%] border-zinc-800"></div>

      <div className="flex h-[45px]">
        <TweetStatistics 
          fetchedTweet={tweet} 
          session={session}
          showStatsNumbers={false}
          iconSpacing="justify-around"
        />
      </div>

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