import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITweetStatistics { 
  likes_count: number;
  replies_count: number;
  views_count: number;
  bookmarks_count: number;
  liked: boolean;
  likeId: number | undefined;
  bookmarked: boolean;
  bookmarkId: number | undefined;
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
          bookmarkId: tweet.bookmarkId,
          views_count: tweet.views_count,
          replies_count: tweet.replies_count,
          bookmarks_count: tweet.bookmarks_count,
          bookmarked: tweet.bookmarked
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
      const targetTweet = state.tweets[action.payload.tweetId];
      if (targetTweet) targetTweet.replies_count += 1;
    },
    incrementLikesCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      const targetTweet = state.tweets[action.payload.tweetId];
      if (targetTweet) targetTweet.likes_count += 1;
    },
    incrementViewsCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      const targetTweet = state.tweets[action.payload.tweetId];
      if (targetTweet) targetTweet.views_count += 1;
    },
    bookmarkATweet: (state, action: PayloadAction<{ tweetId: number, bookmarkId: number }>) => {
      const { tweetId, bookmarkId } = action.payload;  

      state.tweets[tweetId].bookmarks_count += 1;
      state.tweets[tweetId].bookmarked = true;
      state.tweets[tweetId].bookmarkId = bookmarkId;
    },
    unBookmarkATweet: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      state.tweets[tweetId].bookmarks_count -= 1;
      state.tweets[tweetId].bookmarked = false;
      state.tweets[tweetId].bookmarkId = undefined;
    },
  },
});

export const { 
  likeATweet, 
  unlikeATweet, 
  initializeTweetsStatistics, 
  incrementRepliesCount,
  incrementLikesCount,
  incrementViewsCount,
  bookmarkATweet,
  unBookmarkATweet
} = tweetStatisticsSlice.actions;

export default tweetStatisticsSlice.reducer;