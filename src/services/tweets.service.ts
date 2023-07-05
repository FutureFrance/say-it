import { IndividualTweet } from "@/interfaces/tweets/individualTweet.interface";
import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api, axiosAuthHeader } from "@/lib/http";

export const getTweets = async (token: string | undefined = undefined, userId: number, offset = 0, count = 5) => {
  return await api
    .get<IPaginatedTweets>(`/tweets/user/${userId}/?offset=${offset}&count=${count}`, { headers: await axiosAuthHeader(token) })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}

export const createTweet = async (text_body: string, token: string | undefined = undefined, files?: Array<any> | null) => {
    return await api
    .post<ITweet>('tweets', { text_body: text_body, files }, { 
        headers: {
          ...(await axiosAuthHeader(token)),
          "Content-Type": 'multipart/form-data'
        } 
      })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}

export const getTweet = async (token: string | undefined = undefined, userId: number, tweetId: number) => {
  return await api
    .get<IndividualTweet>(`tweets/user/${userId}/${tweetId}`, { headers: await axiosAuthHeader(token)})
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}