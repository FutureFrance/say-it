'use client'

import { useContext, useState } from "react";
import { Session } from "next-auth";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "./tweet";
import { AxiosError } from "axios";
import PopUpMessage from "../ui/errors/popUpMessage";
import { TweetContext } from "@/context/tweetContext";
import { FETCH_TWEET_TAKE } from "@/constants/tweets/tweet.constants";
import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";

type IProps = { 
  session: Session;
  fetchTweets: (...args: Array<any>) => Promise<IPaginatedTweets>;
  funcArgs: Array<any>;
}

export const TweetsSection = ({ session, fetchTweets, funcArgs }: IProps) => {  
  const { tweets, setTweets } = useContext(TweetContext);
  const [pageOffSet, setTageOffSet] = useState<number>(FETCH_TWEET_TAKE);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchNewTweets = async () => {   
    try {
      const response = await fetchTweets(...funcArgs, pageOffSet, FETCH_TWEET_TAKE);

      setTweets(prev => [...prev, ...response.tweets]);
      setTageOffSet(prev => prev + FETCH_TWEET_TAKE);
      setHasMore(response.hasMore);
  
      return [...tweets, ...response.tweets];
    }catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message)
    }
  } 

  return ( 
    <div className="tweets_section">
      {tweets.length > 0 ?
        (
          <InfiniteScroll 
            dataLength={tweets.length}
            next={fetchNewTweets}
            hasMore={hasMore}
            loader={<><div className="border w-[100%] border-zinc-800 mb-2"></div><div className="w-[100%] flex justify-center my-8"><div className="animate-spin rounded-full h-4 w-4 border-t-[2px] border-b-[px] border-blue-500"></div></div></>}
            endMessage={<p className="text-center pt-8">You reached the end :)</p>}
            style={{ maxWidth: '800px' }}
          >
          {
            tweets.map(tweet => {
              return (
                <div key={tweet.id} className="tweet_section hover:bg-hover_tweet_gray"> 
                  <div className="border w-[100%] border-zinc-800 mb-2"></div>

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

      { apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>}
    </div> 
  )
}

export default TweetsSection;