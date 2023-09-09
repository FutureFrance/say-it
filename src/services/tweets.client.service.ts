import { IndividualTweet } from "@/interfaces/tweets/individualTweet.interface";
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { api } from "@/lib/http";

export const createTweet = async (
  accessToken: string, 
  text_body: string, 
  parent_id: number | null = null, 
  files?: Array<any> | null
) => {
  return await api
    .post<{ tweet: ITweet, successMessage: string, requestId: string }>('tweets', 
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
      return res;
    })
    .catch(err => {
      throw err;
    });
}

export const deleteTweet = async(accessToken: string, tweetId: number) => {
  return await api
    .delete<void>(`tweets/${tweetId}`, { headers: { Authorization: `Bearer ${accessToken}`}})
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    });
}

export const getTweet = async (accessToken: string, username: string, tweetId: number) => {
  return await api
    .get<IndividualTweet>(`tweets/user/${username}/${tweetId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    });
}

export const addViewTweet = async (accessToken: string, tweetId: number) => {
  return await api
    .post('/tweets/view', { tweetId }, { headers: { Authorization: `Bearer ${accessToken}` }})
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    });
}