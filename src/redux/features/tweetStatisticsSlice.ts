import { createSlice } from "@reduxjs/toolkit";

type TweetStatisticsState = {
  isTweetLiked: boolean;
  tweetLikeCount: number;
  tweetCommentsCount: number;
}

const initialState: TweetStatisticsState = {
  isTweetLiked: false,
  tweetLikeCount: 0,
  tweetCommentsCount: 0
}

const tweetStatisticsSlice = createSlice({
  name: 'tweetStatistics',
  initialState,
  reducers: {
    likeTweetState: (state) => {
      state.isTweetLiked = !state.isTweetLiked;
      state.tweetLikeCount += 1;
    },
    unlikeTweetState: (state) => {
      state.isTweetLiked = !state.isTweetLiked;
      state.tweetLikeCount -= 1;
    }
  }
});

export const { likeTweetState, unlikeTweetState } = tweetStatisticsSlice.actions;

export default tweetStatisticsSlice.reducer;