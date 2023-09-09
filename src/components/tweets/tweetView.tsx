'use client'

import { Session } from "next-auth";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";
import React, { useCallback, useState } from "react";
import TweetMedia from "./media/tweetMedia";
import TweetStatistics from "./tweetStatistics";
import ActionWarningModal from "../modals/actionWarningModal";
import { deleteTweet } from "@/services/tweets.client.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import TweetSettings from "./tweetSettings";
import UserThoughtsInput from "../user/userThoughtsInput";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

type Props = {
  session: Session;
  tweet: ITweet;
}

const TweetView = ({ session, tweet }: Props) => {
  const [warningModal, setWarningModal] = useState<boolean>(false);

  const tweetLikeCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.likes_count || tweet.likes_count);
  const tweetRepliesCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.replies_count || tweet.replies_count);
  const tweetViewsCount = useAppSelector<number>(state => state.persistedReducer.tweets[tweet.id]?.replies_count || tweet.views_count);


  const router = useRouter();

  const leftMedia: Array<IMedia> = [];
  const rightMedia: Array<IMedia> = [];

  tweet.media.forEach((media, index) => {
    if (index % 2 === 0) {
      leftMedia.push(media);
    } else {
      rightMedia.push(media);
    }
  });

  const handleDeleteTweet = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      await deleteTweet(session.accessToken, tweet.id);
      // routes back if i delete replies too not only on main tweet
      router.back();
    } catch(err) {
      if (err instanceof AxiosError) console.log("deleted")
      // setApiMessage("Could not delete this tweet, please try again later");
    }
  }

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
          setWarningModal={setWarningModal}
        />
      </div>

      <div className="flex items-center min-h-[40px]">
        <span className="text-[17px] leading-6 font-normal">{tweet.text_body}</span>
      </div>

      <div className="mb-[12px]">
        {tweet.media.length > 0 && 
          <TweetMedia 
            tweet={tweet} 
            leftMedia={leftMedia} 
            rightMedia={rightMedia}
          /> 
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

      {warningModal && 
        <ActionWarningModal 
          setWarningModal={setWarningModal}
          mainWarningText="Delete post ?"
          warningText="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results."
          actionText="Delete"
          onClickAction={handleDeleteTweet}
        />
      }
    </article>
  )
}

export default TweetView;