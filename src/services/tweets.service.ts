import { ITweet } from "@/interfaces/tweet.interface";
import { api, axiosAuthHeader } from "@/lib/http";

export const getTweets = async (token: string | undefined = undefined) => {
  return await api
    .get<ITweet[]>('/tweets/user/1', await axiosAuthHeader(token))
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw err;
    })
}