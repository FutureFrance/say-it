import { ITweet } from "./tweet.interface";

export interface IPaginatedTweets { 
  tweets: Array<ITweet>;
  hasMore: boolean;
} 

export enum fetchTargetEnum {
  FEED = 'tweets',
  TWEET = 'tweet',
  USER = 'user'
}