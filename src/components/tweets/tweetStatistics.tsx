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

export const TweetStatistics = ({ fetchedTweet, session } : { fetchedTweet: ITweet, session: Session }) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const isTweetLiked = useAppSelector<boolean>(state => state.persistedReducer[fetchedTweet.id]?.liked);
  const tweetLikeCount = useAppSelector<number>(state => state.persistedReducer[fetchedTweet.id]?.likes_count);
  const tweetLikeId = useAppSelector<number | undefined>(state => state.persistedReducer[fetchedTweet.id]?.likeId);
  const tweetRepliesCount = useAppSelector<number>(state => state.persistedReducer[fetchedTweet.id]?.replies_count);

  const dispatch = useAppDispatch();

  const handleCommentClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    setIsModalOn(true);
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();

    try {
      if (isTweetLiked) {
        await deleteLike(session.accessToken, tweetLikeId as number, fetchedTweet.id);

        dispatch(unlikeATweet({ tweetId: fetchedTweet.id}));
      } else {
        const likedTweet = await likeTweet(session.accessToken, fetchedTweet.id);
        
        dispatch(likeATweet({ tweetId: likedTweet.id, likeId: likedTweet.likeId as number, likes_count: likedTweet.likes_count}));
      }
    } catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  return (
    <div className="tweet_statistics flex justify-between items-center">
      <TweetsStat 
        text={tweetRepliesCount}
        imgSrc="/assets/tweet_statistics/comments_icon.png"
        textHoverStyles='text-sky-400 transition-colors duration-500 ease-in-out'
        imgHoverStyles='bg-hover_comment_blue transition-colors duration-500 ease-in-out'
        clickAction={handleCommentClick}
      />

      <TweetsStat 
        text={tweetLikeCount}
        isOn={isTweetLiked}
        imgSrc="/assets/tweet_statistics/heart_icon.png"
        textHoverStyles='text-rose-600 transition-colors duration-500 ease-in-out'
        imgHoverStyles='bg-hover_like_red transition-colors duration-500 ease-in-out'
        clickAction={handleLikeClick}
      />

      <TweetsStat 
        text={fetchedTweet.views}
        imgSrc="/assets/tweet_statistics/bar_chart_icon.png" 
        textHoverStyles='text-neutral-400 transition-colors duration-500 ease-in-out'
        imgHoverStyles='bg-hover_view_gray transition-colors duration-500 ease-in-out'
      />

      {
        isModalOn && 
        <TweetModal 
          session={session} 
          setModalOn={setIsModalOn} 
          modalOn={isModalOn}
          inputId="comment_file_input" 
          tweetParentId={fetchedTweet.id} 
          toReply={true}
        />
      }

      {
        apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>
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
}

export const TweetsStat = ({ clickAction, imgHoverStyles, textHoverStyles, text, imgSrc, alt = '', isOn = false }: IStatProps) => {
  const [isHoverOn, setIsHoverOn] = useState<boolean>(false);
  
  return (
    <div 
      className={`flex gap-1 items-center`}
      onMouseEnter={() => setIsHoverOn(true)}
      onMouseLeave={() => setIsHoverOn(false)}
      onClick={e => clickAction ? clickAction(e) : null}>
      <img
        className={`max-w-[25px] max-h-[25px] transition p-[4px] rounded-full ${isHoverOn || isOn ? imgHoverStyles : ''}`}
        src={imgSrc}
        alt={alt}
      />
      <p className={`text-xs ${isHoverOn ? textHoverStyles : ''}`}>{text}</p>
    </div>
  )
}

