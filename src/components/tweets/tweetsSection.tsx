'use client'

import { useContext, useState } from "react";
import { Session } from "next-auth";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "./tweet";
import { getTweetReplies, getUserTweets } from "@/services/tweets.service";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { fetchTargetEnum } from "@/app/feed/page";
import { AxiosError } from "axios";
import PopUpMessage from "../ui/errors/popUpMessage";
import { TweetContext } from "@/context/tweetContext";

type IProps = { 
  session: Session;
  fetchTarget: fetchTargetEnum;
  targetId: number;
}

export const TweetsSection = ({ session, fetchTarget, targetId }: IProps) => {
  const { tweets, setTweets } = useContext(TweetContext);
  const [pageOffSet, setTageOffSet] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchNewTweets = async () => {   
    try {
      const response = fetchTarget === fetchTargetEnum.REPLIES
        ? await getTweetReplies(session.accessToken, targetId, pageOffSet)
        : await getUserTweets(session.accessToken, session.user.id, pageOffSet);
  
      setTweets(prev => [...prev, ...response.tweets]);
      setTageOffSet(prev => prev + 5);
      setHasMore(response.hasMore);
  
      return [...tweets, ...response.tweets];
    }catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message)
    }
  } 
  console.log('render')
  return ( 
    <div className="tweets_section">
      {tweets.length > 0 ?
        (
          <InfiniteScroll 
            dataLength={tweets.length}
            next={fetchNewTweets}
            hasMore={hasMore}
            loader={<p className="text-center pt-4">Loading...</p>}
            endMessage={<p className="text-center pt-4">You reached the end :)</p>}
            style={{ maxWidth: '800px' }}
          >
          {
            tweets.map(tweet => {
              return (
                <div key={tweet.id} className="tweet_section"> 
                  <div className="border w-[100%] border-zinc-800 my-2"></div>

                  <Tweet  
                    session={session} 
                    tweet={tweet}
                  />
                </div>
              ) 
            })
          }
          </InfiniteScroll>
        )
        : <p className="text-center">No tweets :|</p>
      }  

      { apiError && <PopUpMessage text={apiError} setText={setApiError} iconSrc="/assets/error_info.png"/>}
    </div> 
  )
}

export default TweetsSection;