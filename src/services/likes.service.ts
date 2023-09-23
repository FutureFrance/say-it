import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api } from "@/lib/http";
import { IUser } from "@/types/user.interface";

export const likeTweet = async (accessToken: string, tweetId: number) => {
  return await api
    .post<ITweet>('/likes', { tweetId }, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      throw e;
    });
}

export const getTweetLikes = async (accessToken: string, tweetId: number) => {
  return await api
    .get<TweetLikesResponse>(`/likes/tweet/${tweetId}`, { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res;
    })
    .catch(e => {
      throw e;
    });
}

export const deleteLike = async (accessToken: string, likeId: number, tweetId: number) => {
  return await api
    .delete<void>(`/likes/${likeId}/${tweetId}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res?.data;
    })
    .catch(e => {
      throw e;
    });
}

export type TweetLikesResponse = {
  likes: Array<ILike>,
  hasMore: boolean;
}

export interface ILike {
  amIfollowingUser: boolean, 
  user: Pick<IUser, "avatar" | "username" | "name" | "bio" | "id"> & 
  { 
    amIfollowing: boolean 
  }
};