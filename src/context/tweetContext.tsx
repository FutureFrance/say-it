'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { SetStateAction, createContext, useState, Dispatch } from "react";

type TweetContextType = {
  tweets: ITweet[];
  setTweets: Dispatch<SetStateAction<ITweet[]>>;
};

export const TweetContext = createContext<TweetContextType>({
  tweets: [],
  setTweets: () => {}
});

export const TweetProvider = ({ children, fetchedTweets } : { children: React.ReactNode, fetchedTweets: Array<ITweet>}) => {
  const [tweets, setTweets] = useState(fetchedTweets);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  )
}