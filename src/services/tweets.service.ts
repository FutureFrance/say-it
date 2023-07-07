import { IndividualTweet } from "@/interfaces/tweets/individualTweet.interface";
import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api } from "@/lib/http";

export const getUserTweets = async (accessToken: string, userId: number, offset = 0, count = 5) => { // get user tweets but need get feed tweets
  return await api
    .get<IPaginatedTweets>(`/tweets/user/${userId}/?offset=${offset}&count=${count}`, { headers: {  Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}

export const getTweetReplies = async (accessToken: string, tweetId: number, offset = 0, count = 5) => { // get user tweets but need get feed tweets
  return await api
    .get<IPaginatedTweets>(`/tweets/replies/${tweetId}/?offset=${offset}&count=${count}`, { headers: {  Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}


export const createTweet = async (
    accessToken: string, 
    text_body: string, 
    parent_id: number | null = null, 
    files?: Array<any> | null
  ) => {
  return await api
  .post<ITweet>('tweets', 
      { 
        text_body: text_body, 
        parent_id,
        files 
      }, { 
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

export const getTweet = async (accessToken: string, userId: number, tweetId: number) => {
  return await api
    .get<IndividualTweet>(`tweets/user/${userId}/${tweetId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}