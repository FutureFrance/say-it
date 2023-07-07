import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api } from "@/lib/http";

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