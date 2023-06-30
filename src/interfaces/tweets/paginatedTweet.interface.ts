import { ITweet } from "./tweet.interface";

export interface IPaginatedTweets { 
  tweets: Array<ITweet>, 
  hasMore: boolean
} 