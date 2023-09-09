'use server'

import { FETCH_TWEET_TAKE } from "@/constants/tweets/tweet.constants";
import { IPaginatedTweets } from "@/interfaces/tweets/paginatedTweet.interface";
import { api } from "@/lib/http";

export const getFeedTweets = async (accessToken: string, offset = 0, take = FETCH_TWEET_TAKE) => {
  "use server"
  return await api.
    get<IPaginatedTweets>(`/tweets/feed/?offset=${offset}&take=${take}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    })
}

export const getUserTweets = async (accessToken: string, username: string, offset = 0, take = FETCH_TWEET_TAKE) => { 
  "use server"
  return await api
    .get<IPaginatedTweets>(`/tweets/user/${username}/?offset=${offset}&take=${take}`, { headers: {  Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    })
}

export const getTweetReplies = async (accessToken: string, tweetId: number, offset = 0, take = FETCH_TWEET_TAKE) => { 
  "use server"
  return await api
    .get<IPaginatedTweets>(`/tweets/replies/${tweetId}/?offset=${offset}&take=${take}`, { headers: {  Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    })
}