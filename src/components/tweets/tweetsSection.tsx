'use client'

import { useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "./tweet";
import { AxiosError } from "axios";
import PopUpMessage from "../ui/errors/popUpMessage";
import { TweetContext } from "@/context/tweetContext";
import { FETCH_TWEET_TAKE } from "@/constants/tweets/tweet.constants";
import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { initializeTweetsStatistics } from "@/redux/features/tweetStatisticsSlice";
import SpinningLoader from "../ui/loaders/spinningLoader";
import NoDataInfo from "../ui/informative/noDataInfo";

type IProps = { 
  session: Session;
  fetchNewTweets: (...args: Array<any>) => Promise<IPaginatedTweets>;
  funcArgs: Array<any>;
}

export const TweetsSection = ({ session, fetchNewTweets, funcArgs }: IProps) => {  
  const { tweets, setTweets } = useContext(TweetContext);
  const [pageOffSet, setPageOffSet] = useState<number>(FETCH_TWEET_TAKE);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const tweetsStats = useAppSelector(state => state.persistedReducer.tweets);
  const dispatch = useAppDispatch();  

  useEffect(() => {
    if (tweets.length > 0 && tweetsStats[tweets[0].id] === undefined) { 
      dispatch(initializeTweetsStatistics({ initialTweetsStats: tweets })); 
    }
  }, []); 

  const handlefFetchNewTweets = async () => {   
    try {
      const response = await fetchNewTweets(...funcArgs, pageOffSet, FETCH_TWEET_TAKE);

      setTweets(prev => [...prev, ...response.tweets]);
      setPageOffSet(prev => prev + FETCH_TWEET_TAKE);
      setHasMore(response.hasMore);
      dispatch(initializeTweetsStatistics({ initialTweetsStats: response.tweets })); 

      return [...tweets, ...response.tweets];
    }catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message)
    }
  } 

  return ( 
    <div className={`${tweets.length === 0 ? 'flex items-center justify-center h-[100vh]' : ''}`}>
      {tweets.length > 0 ?
        (
          <InfiniteScroll 
            dataLength={tweets.length}
            next={handlefFetchNewTweets}
            hasMore={hasMore}
            loader={<SpinningLoader />}
            style={{ maxWidth: '850px' }}
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
        : <NoDataInfo text="Your not following anyone, follow someone to see tweets"/>
      }  

      { apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>}
    </div> 
  )
}

export default TweetsSection;