'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useState } from "react";
import { Session } from "next-auth";
import TweetModal from "../modals/tweetModal";
import { AxiosError } from "axios";
import { deleteLike, likeTweet } from "@/services/likes.service";
import PopUpMessage from "../ui/errors/popUpMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { likeATweet, unlikeATweet } from "@/redux/features/tweetStatisticsSlice";

type Props = {
  fetchedTweet: ITweet; 
  session: Session; 
  showStatsNumbers?: boolean; 
  iconSpacing?: string;
}

export const TweetStatistics = ({ fetchedTweet, session, showStatsNumbers = true, iconSpacing = "justify-between" }: Props) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isTweetLiked = useAppSelector<boolean>(state => state.persistedReducer.tweets[fetchedTweet.id]?.liked);
  const tweetLikeCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.likes_count);
  const tweetRepliesCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.replies_count);
  const tweetViewsCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.views_count);
  const tweetLikeId = useAppSelector<number | undefined>(state => state.persistedReducer.tweets[fetchedTweet.id]?.likeId);
  
  const dispatch = useAppDispatch();

  const handleCommentClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsModalOn(true);
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (isTweetLiked) {
        await deleteLike(session.accessToken, tweetLikeId as number, fetchedTweet.id);

        dispatch(unlikeATweet({ tweetId: fetchedTweet.id}));
      } else {
        const likedTweetResponse = await likeTweet(session.accessToken, fetchedTweet.id);

        dispatch(likeATweet({ tweetId: likedTweetResponse.id, likeId: likedTweetResponse.likeId as number }));
      }
    } catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  return (
    <div className={`w-full flex ${iconSpacing} items-center select-none`}>
      <TweetsStat 
        text={tweetRepliesCount}
        imgSrc="/assets/tweet_statistics/comments_icon.png"
        textHoverStyles='text-sky-400 transition-colors duration-300 ease-in-out'
        imgHoverStyles='bg-hover_comment_blue transition-colors duration-300 ease-in-out'
        clickAction={handleCommentClick}
        showStatsNumbers={showStatsNumbers}
      />

      <TweetsStat 
        text={tweetLikeCount}
        isOn={isTweetLiked}
        imgSrc="/assets/tweet_statistics/heart_icon.png"
        textHoverStyles='text-tweet_like transition-colors duration-300 ease-in-out'
        imgHoverStyles='bg-hover_like_red transition-colors duration-300 ease-in-out'
        clickAction={handleLikeClick}
        showStatsNumbers={showStatsNumbers}
      />

      <TweetsStat 
        text={tweetViewsCount}
        imgSrc="/assets/tweet_statistics/bar_chart_icon.png" 
        textHoverStyles='text-neutral-400 transition-colors duration-300 ease-in-out'
        imgHoverStyles='bg-hover_view_gray transition-colors duration-300 ease-in-out'
        showStatsNumbers={showStatsNumbers}
      />

      <TweetsStat 
        text={0}
        imgSrc="/assets/tweet_statistics/bookmark_icon.svg" 
        textHoverStyles='text-sky-400 transition-colors duration-300 ease-in-out'
        imgHoverStyles='bg-hover_comment_blue transition-colors duration-300 ease-in-out'
        showStatsNumbers={showStatsNumbers}
      />

      { isModalOn && 
        <TweetModal 
          session={session} 
          setModalOn={setIsModalOn} 
          modalOn={isModalOn}
          inputId="comment_file_input" 
          parentTweet={fetchedTweet} 
          toReply={true}
        />
      }

      {
        apiError && <PopUpMessage text={apiError} setText={setApiError} />
      }
    </div>
  )
}

export default TweetStatistics;

type IStatProps = {
  clickAction?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  imgSrc: string | undefined;
  isOn?: boolean;
  alt?: string;
  imgHoverStyles: string;
  textHoverStyles: string;
  text: string | undefined | number;
  showStatsNumbers: boolean;
}

export const TweetsStat = ({ 
  clickAction, 
  imgHoverStyles, 
  textHoverStyles, 
  text, 
  imgSrc, 
  alt = '', 
  isOn = false, 
  showStatsNumbers,
}: IStatProps) => {
  const [isHoverOn, setIsHoverOn] = useState<boolean>(false);
  
  return (
    <div 
      className={`flex gap-2 items-center justify-center cursor-pointer`}
      onMouseEnter={() => setIsHoverOn(true)}
      onMouseLeave={() => setIsHoverOn(false)}
      onClick={e => { clickAction ? clickAction(e) : e.stopPropagation(); e.preventDefault() }}>
      <img
        className={`${showStatsNumbers ? 'max-h-[25px] max-w-[25px]' : 'max-h-[30px] max-w-[30px]'} transition rounded-full p-[5px] ${isHoverOn || isOn ? imgHoverStyles : ''}`}
        src={imgSrc}
        alt={alt}
      />
      {showStatsNumbers && <p className={`text-xs ${isHoverOn ? textHoverStyles : ''}`}>{text}</p>}
    </div>
  )
}

