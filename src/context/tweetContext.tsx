'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { SetStateAction, createContext, useState, Dispatch } from "react";

type TweetContextType = {
  tweets: Array<ITweet>;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
};

export const TweetContext = createContext<TweetContextType>({
  tweets: [],
  setTweets: () => {},
});

export const TweetProvider = (
  { children, fetchedTweetsServer } : { children: React.ReactNode, fetchedTweetsServer: Array<ITweet>}
) => {
  const [tweets, setTweets] = useState(fetchedTweetsServer);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  )
}