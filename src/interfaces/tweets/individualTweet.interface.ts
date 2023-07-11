import { ITweet } from "./tweet.interface";

export interface IndividualTweet {
  parentTweet: ITweet;
  tweets: Array<ITweet>;
  hasMore: boolean;
}