import { ITweet } from "@/interfaces/tweet.interface";
import { Session } from "next-auth";
import Tweet from "./tweet";

type IProps = { 
  tweets: Array<ITweet>, 
  session: Session 
}

export const Tweets = ({ tweets, session }: IProps) => {
  return (
    <div className="tweets_section">
      {
        tweets.map(tweet => {
          return (
            <>
              <div className="border w-[100%] border-zinc-800 my-2"></div>

              <Tweet 
                key={tweet.id} 
                session={session} 
                tweet={tweet}
              />
            </>
          ) // if no tweets than display user has not tweets 
        })
      }
  </div> 
  )
}

export default Tweets;