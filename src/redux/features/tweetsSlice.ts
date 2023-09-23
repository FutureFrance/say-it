import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface tweetsSlice {
  userTweets: Array<number>;
  feedTweets: Array<number>;
  bookmarks: Array<number>;
  tweets: {
    [tweetId: number]: ITweet;
  },
  replies: {
    [tweetId: number]: Array<number>;
  }
}

const initialState: tweetsSlice = { 
  userTweets: [],
  feedTweets: [],
  bookmarks: [],
  tweets: {},
  replies: {}
};
 
const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    initializeTweet: (state, action: PayloadAction<{ tweet: ITweet }>) => {
      const { tweet } = action.payload;

      state.tweets[tweet.id] = tweet;
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
    incrementRepliesCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      const targetTweet = state.tweets[tweetId];

      if (targetTweet) targetTweet.replies_count += 1;
    },
    incrementLikesCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      const targetTweet = state.tweets[tweetId];

      if (targetTweet) targetTweet.likes_count += 1;
    },
    incrementViewsCount: (state, action: PayloadAction<{ tweetId: number }>) => {
      const { tweetId } = action.payload;

      const targetTweet = state.tweets[tweetId];
      if (targetTweet) targetTweet.views_count += 1;
    }
  },
});

export const { 
  initializeTweet,
  likeATweet,
  unlikeATweet,
  bookmarkATweet,
  unBookmarkATweet,
  incrementLikesCount,
  incrementRepliesCount,
  incrementViewsCount,
} = tweetsSlice.actions;

export default tweetsSlice.reducer;
