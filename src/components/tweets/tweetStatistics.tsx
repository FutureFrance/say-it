'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useState } from "react";
import Modal from "../modal";
import UserThoughtsInput from "../userThoughtsInput";
import { Session } from "next-auth";

export const TweetStatistics = ({ tweet, session } : { tweet: ITweet, session: Session }) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);

  const handleCommentClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    setIsModalOn(true);
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

      <div className="likes flex gap-2 items-center" onClick={(e) => e.stopPropagation()}>
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-[red] rounded-full p-[2px]"  
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
        <Modal setModalOn={setIsModalOn}>
          <div 
            className="modal_container bg-[black] w-[35%] h-[35%] rounded-[30px]" //sm:w-[100%]
            onClick={(e) => e.stopPropagation()}
          >
            <UserThoughtsInput session={session} inputId="comment_file_input"/>
          </div>
        </Modal>
      }
    </div>
  )
}

export default TweetStatistics;