'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import TweetModal from "../modals/tweetModal";
import { AxiosError } from "axios";
import { deleteLike, likeTweet } from "@/services/likes.service";
import PopUpMessage from "../ui/errors/popUpMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { initializeLikes, likeATweet, unlikeATweet } from "@/redux/features/likesSlice";

export const TweetStatistics = ({ fetchedTweet, session } : { fetchedTweet: ITweet, session: Session }) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const isTweetLiked = useAppSelector(state => state.persistedReducer[fetchedTweet.id]?.liked);
  const tweetLikeCount = useAppSelector(state => state.persistedReducer[fetchedTweet.id]?.likes_count);
  const tweetLikeId = useAppSelector(state => state.persistedReducer[fetchedTweet.id]?.likeId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTweetLiked === undefined && tweetLikeCount === undefined) {dispatch(initializeLikes({ initialLikes: { likes_count: fetchedTweet.likes_count, liked: fetchedTweet.liked, likeId: fetchedTweet.likeId }, tweetId: fetchedTweet.id })); console.log("dispatched initial")};
    console.log(isTweetLiked, tweetLikeCount, tweetLikeId)
  }, []);

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
       <div className="replies flex gap-2 items-center" onClick={e => handleCommentClick(e)}>
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-[blue] rounded-full p-[2px]" 
          src="/assets/tweet_statistics/comments_icon.png" 
          alt="stats_icon" />
        <p>{fetchedTweet.replies_count}</p>
      </div>

      <div className={`likes flex gap-2 items-center`} onClick={(e) => handleLikeClick(e)}>
        <img
          className={`max-w-[20px] max-h-[20px] hover:bg-[red] rounded-full p-[2px] ${isTweetLiked ? 'bg-[red]' : ''}`}
          src="/assets/tweet_statistics/heart_icon.png" 
          alt="heart_icon" />
        <p className="font-size-sm">{tweetLikeCount}</p>
      </div>
      
      <div className="views" onClick={(e) => e.stopPropagation()}>
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-neutral-800 rounded-full p-[2px]" 
          src="/assets/tweet_statistics/bar_chart_icon.png" 
          alt="stats_icon" />
        <p>{fetchedTweet.views}</p>
      </div>

      {
        isModalOn && 
        <TweetModal session={session} setModalOn={setIsModalOn} inputId="comment_file_input" tweetParentId={fetchedTweet.id} toReply={true}/>
      }

      {
        apiError && <PopUpMessage text={apiError} setText={setApiError} iconSrc="/assets/error_info.png"/>
      }
    </div>
  )
}

export default TweetStatistics;