'use client'

import Tweet from "@/components/tweets/tweet";
import SpinningLoader from "@/components/ui/loaders/spinningLoader";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { initializeTweetsStatistics } from "@/redux/features/tweetStatisticsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IGetBookmarks, getBookmarks } from "@/services/user.service";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  session: Session; 
  bookmarksResponse: IGetBookmarks; 
}

const FETCH_BOOKMARKS_TAKE = 20;

const BookmarksList = ({ session, bookmarksResponse }: Props) => {
  const [tweets, setTweets] = useState<Array<ITweet>>(bookmarksResponse.tweets);
  const [hasMore, setHasMore] = useState<boolean>(bookmarksResponse.hasMore);
  const [pageOffSet, setPageOffset] = useState<number>(FETCH_BOOKMARKS_TAKE);

  const tweetsStats = useAppSelector(state => state.persistedReducer.tweets);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tweets.length > 0 && tweetsStats[tweets[0].id] === undefined) { 
      dispatch(initializeTweetsStatistics({ initialTweetsStats: tweets })); 
    }
  }, []); 

  const handleFetchNewBookmarks = async () => {
    try {
      const response = await getBookmarks(session.accessToken, pageOffSet, FETCH_BOOKMARKS_TAKE);

      setTweets(prev => [...prev, ...response.data.tweets]);
      setPageOffset(prev => prev + FETCH_BOOKMARKS_TAKE);
      setHasMore(response.data.hasMore);

      return [...tweets, response.data.tweets];
    } catch(err) {}
  }
  
  return (
    <>
    { tweets.length != 0 
      ?
        <InfiniteScroll
          dataLength={tweets.length}
          next={handleFetchNewBookmarks}
          hasMore={hasMore}
          loader={<SpinningLoader />}
        >
          {
            tweets.map(tweet => {
              return (
                <div key={tweet.id} className="hover:bg-hover_tweet_gray"> 
                  <Tweet  
                    session={session} 
                    tweet={tweet}
                    setTweets={setTweets}
                  />

                  <div className="border w-[100%] border-zinc-800 mb-2"></div>
                </div>
              ) 
            })
          }
        </InfiniteScroll>
      : 
        <div className="pt-12 flex justify-center">
          <div className="flex flex-col w-[300px] break-words">
            <span className="text-3xl font-bold mb-2">Save tweets for later</span>
            <span className="font-normal text-[15px] text-zinc-500">Bookmark tweets to easily find them again in the future.</span>
          </div>
        </div>
    }
    </>
  )
} 

export default BookmarksList;