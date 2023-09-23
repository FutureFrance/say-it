// import { ITweet } from "@/interfaces/tweets/tweet.interface";
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// interface repliesSlice {
//   replies: {
//     [tweetId: number]: Array<number>;
//   }, 
//   tweets: {
//     [tweetId: number]: ITweet;
//   }
// }

// const initialState: repliesSlice = { 
//   replies: {},
//   tweets: {}
// };
 
// const repliesSlice = createSlice({
//   name: 'replies',
//   initialState,
//   reducers: {
//     // addReplies: (state, action: PayloadAction<{ tweets: Array<ITweet>, parentTweetId: number }>) => {
//     //   const { tweets, parentTweetId} = action.payload;

//     //   tweets.forEach(tweet => {
//     //     state.replies[parentTweetId].push(tweet.id);
//     //     state.tweets[tweet.id] = tweet;
//     //   });
//     // },
//     // insertFreshReply: (state, action: PayloadAction<{ tweet: ITweet, parentTweetId: number }>) => {
//     //   const { tweet, parentTweetId } = action.payload;

//     //   state.replies[parentTweetId] = [tweet.id, ...state.replies[parentTweetId]];
//     //   state.tweets[tweet.id] = tweet;
//     // },
//     removeReply: (state, action: PayloadAction<{ tweetId: number, parentTweetId: number }>) => {
//       const { tweetId, parentTweetId } = action.payload;

      
//     },
//   },
// });

// export const { 
//   // addReplies,
//   // insertFreshReply,
//   removeReply,
// } = repliesSlice.actions;

// export default repliesSlice.reducer;
