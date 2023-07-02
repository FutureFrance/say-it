import { ITweet } from "./tweet.interface";

export interface IndividualTweet {
  tweet: ITweet;
  replies: Array<ITweet>; // || []
}