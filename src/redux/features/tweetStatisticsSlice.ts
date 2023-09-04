import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITweetStatistics { 
  likes_count: number;
  replies_count: number;
  liked: boolean;
  likeId: number | undefined;
}

interface tweetStatisticsState {
  tweets: {
    [tweetId: number]: ITweetStatistics;
  }
}

const initialState: tweetStatisticsState = { tweets: {} };

const tweetStatisticsSlice = createSlice({
  name: 'tweetStatistics',
  initialState,
  reducers: {
    initializeTweetsStatistics: (state, action: PayloadAction<{ initialTweetsStats: Array<ITweet> }>) => {
      const { initialTweetsStats } = action.payload;  

      initialTweetsStats.forEach(tweet => {
        state.tweets[tweet.id] = {
          likes_count: tweet.likes_count, 
          liked: tweet.liked, 
          likeId: tweet.likeId,
          replies_count: tweet.replies_count
        }
      });
    },
    likeATweet: (state, action: PayloadAction<{ tweetId: number, likeId: number }>) => {
      const { tweetId, likeId } = action.payload;  

      state.tweets[tweetId].likes_count += 1;
      state.tweets[tweetId].liked = true;
      state.tweets[tweetId].likeId = likeId;
    },
    unlikeATweet: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      state.tweets[tweetId].likes_count -= 1;
      state.tweets[tweetId].liked = false;
      state.tweets[tweetId].likeId = undefined;
    },
    incrementRepliesCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      state.tweets[action.payload.tweetId].replies_count += 1;
    },
  },
});

export const { 
  likeATweet, 
  unlikeATweet, 
  initializeTweetsStatistics, 
  incrementRepliesCount,
} = tweetStatisticsSlice.actions;

export default tweetStatisticsSlice.reducer;