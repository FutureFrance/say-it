'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useState } from "react";
import { Session } from "next-auth";
import TweetModal from "../modals/tweetModal";
import { AxiosError } from "axios";
import { deleteLike, likeTweet } from "@/services/likes.service";
import PopUpMessage from "../ui/errors/popUpMessage";

export const TweetStatistics = ({ fetchedTweet, session } : { fetchedTweet: ITweet, session: Session }) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [tweet, setTweet] = useState<ITweet>(fetchedTweet);
 
  const handleCommentClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    setIsModalOn(true);
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();

    try {
      if (tweet.liked) {
        await deleteLike(session.accessToken, tweet.likeId as number, tweet.id);

        setTweet(prev => ({ ...prev, likes_count: prev.likes_count -= 1, liked: !prev.liked }));
      } else {
        const likedTweet = await likeTweet(session.accessToken, tweet.id)
        
        setTweet(prev => ({ ...likedTweet, liked: !prev.liked, likeId: likedTweet.likeId }));
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
        <p>{tweet.replies_count}</p>
      </div>

      <div className={`likes flex gap-2 items-center`} onClick={(e) => handleLikeClick(e)}>
        <img
          className={`max-w-[20px] max-h-[20px] hover:bg-[red] rounded-full p-[2px] ${tweet.liked ? 'bg-[red]' : ''}`}
          src="/assets/tweet_statistics/heart_icon.png" 
          alt="heart_icon" />
        <p className="font-size-sm">{tweet.likes_count}</p>
      </div>
      
      <div className="views" onClick={(e) => e.stopPropagation()}>
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-neutral-800 rounded-full p-[2px]" 
          src="/assets/tweet_statistics/bar_chart_icon.png" 
          alt="stats_icon" />
        <p>{tweet.views}</p>
      </div>

      {
        isModalOn && 
        <TweetModal session={session} setModalOn={setIsModalOn} inputId="comment_file_input" tweetParentId={tweet.id} toReply={true}/>
      }

      {
        apiError && <PopUpMessage text={apiError} setText={setApiError} iconSrc="/assets/error_info.png"/>
      }
    </div>
  )
}

export default TweetStatistics;