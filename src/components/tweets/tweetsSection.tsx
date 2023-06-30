'use client'

import { useState } from "react";
import { Session } from "next-auth";
import InfiniteScroll from "react-infinite-scroll-component";
import Tweet from "./tweet";
import { getTweets } from "@/services/tweets.service";
import { ITweet } from "@/interfaces/tweets/tweet.interface";

type IProps = { 
  fetchedTweets: Array<ITweet>, 
  session: Session 
}

export const TweetsSection = ({ fetchedTweets, session }: IProps) => {
  const [tweets, setTweets] = useState<Array<ITweet>>(fetchedTweets);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchNewTweets = async () => {
    const response = await getTweets(session.accessToken, session.user.id, page);

    setTweets(prev => [...prev, ...response.tweets]);
    setPage(prev => prev + 1);
    setHasMore(response.hasMore);

    return [...tweets, ...response.tweets];
  } 

  return ( 
    <div className="tweets_section">
      {tweets.length > 0 ?
        (
          // <InfiniteScroll 
          //   dataLength={tweets.length}
          //   next={fetchNewTweets}
          //   hasMore={hasMore}
          //   loader={<p className="text-center pt-4">Loading...</p>}
          //   endMessage={<p className="text-center pt-4">You reached the end :)</p>}
          //   style={ {
          //     maxWidth: '800px'
          //   }}
          // >
          <div className="max-w-[800px]">
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
          </div>
      
        )
        : <p className="text-center">No tweets :|</p>
      }
      
    </div> 
  )
}

export default TweetsSection;