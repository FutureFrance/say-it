'use client'

import { ITweet } from "@/interfaces/tweet.interface";
import { Session } from "next-auth";
import Tweet from "./tweet";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTweets } from "@/services/tweets.service";
import { useState } from "react";

type IProps = { 
  tweets: Array<ITweet>, 
  session: Session 
}

export const Tweets = ({ tweets, session }: IProps) => {
  const [haha, setHaha] = useState(tweets);

  const fetchData = async () => {
    console.log("FETCHING")
    const response = await getTweets();

    setHaha(prev => [...prev, ...tweets])
    return [...tweets, ...tweets]
  } 

  return ( 
    <div className="tweets_section">
      <InfiniteScroll 
        dataLength={haha.length}
        next={fetchData}
        hasMore={true}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        {/* // switch to tweet.id key */}
      {
        haha.map(tweet => {
          return (
            <div key={Math.random().toString(36).slice(-8)} className="tweet_section"> 
              <div className="border w-[100%] border-zinc-800 my-2"></div>

              <Tweet  
                session={session} 
                tweet={tweet}
              />
            </div>
          ) // if no tweets than display user has not tweets 
        })
      }
      </InfiniteScroll>
    </div> 
  )
}

export default Tweets;