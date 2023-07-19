import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITweetStatistics { 
  likes_count: number;
  replies_count: number;
  liked: boolean;
  likeId: number | undefined;
}

interface tweetStatisticsState {
  [tweetId: number]: ITweetStatistics;
}

const initialState: tweetStatisticsState = {};

const tweetStatisticsSlice = createSlice({
  name: 'tweetStatistics',
  initialState,
  reducers: {
    initializeTweetsStatistics: (state, action: PayloadAction<{ initialTweetsStats: Array<ITweet> }>) => {
      const { initialTweetsStats } = action.payload;  

      initialTweetsStats.forEach(tweet => {
        state[tweet.id] = {
          likes_count: tweet.likes_count, 
          liked: tweet.liked, 
          likeId: tweet.likeId,
          replies_count: tweet.replies_count
        }
      });
    },
    likeATweet: (state, action: PayloadAction<{ tweetId: number, likeId: number, likes_count: number }>) => {
      const { tweetId, likeId, likes_count } = action.payload;  

      state[tweetId].likes_count = likes_count;
      state[tweetId].liked = !state[tweetId].liked;
      state[tweetId].likeId = likeId;
    },
    unlikeATweet: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      state[tweetId].likes_count = state[tweetId].likes_count - 1;
      state[tweetId].liked = !state[tweetId].liked;
      state[tweetId].likeId = undefined;
    },
    incrementRepliesCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      state[action.payload.tweetId].replies_count += 1;
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