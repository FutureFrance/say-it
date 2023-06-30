import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api, axiosAuthHeader } from "@/lib/http";

export const getTweets = async (token: string | undefined = undefined, userId: number, page = 0, count = 1) => {
  return await api
    .get<IPaginatedTweets>(`/tweets/user/${userId}/?page=${page}&count=${count}`, await axiosAuthHeader(token))
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}