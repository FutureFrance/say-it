import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LikesState {
  [tweetId: number]: { likes_count: number, liked: boolean, likeId: number | undefined};
}

const initialState: LikesState = {};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    initializeLikes: (state, action: PayloadAction<{ tweetId: number, initialLikes: { likes_count: number, liked: boolean, likeId: number | undefined } }>) => {
      const { initialLikes, tweetId } = action.payload;  console.log(action);

      state[tweetId] = initialLikes;
    },
    likeATweet: (state, action: PayloadAction<{ tweetId: number, likeId: number, likes_count: number }>) => {
      const { tweetId, likeId, likes_count } = action.payload;  console.log(action);

      state[tweetId].likes_count = likes_count;
      state[tweetId].liked = !state[tweetId].liked;
      state[tweetId].likeId = likeId;
    },
    unlikeATweet: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload; console.log(action);

      state[tweetId].likes_count = state[tweetId].likes_count - 1;
      state[tweetId].liked = !state[tweetId].liked;
      state[tweetId].likeId = undefined;

      console.log('after unlike', state[tweetId]);
    },
  },
});

export const { likeATweet, unlikeATweet, initializeLikes } = likesSlice.actions;

export default likesSlice.reducer;