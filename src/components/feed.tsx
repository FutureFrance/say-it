'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth";
import UserThoughtsInput from "./userThoughtsInput";
import TweetsSection from "./tweets/tweetsSection";

type IProps = {
  tweets: Array<ITweet>, 
  session: Session
}

const Feed = ({ tweets, session }: IProps) => {
  return (
    <section className="text-white font-thin border border-zinc-800 col-span-2 max-w-[600px]">
      <UserThoughtsInput session={session}/>
      <TweetsSection fetchedTweets={tweets} session={session}/>
    </section>
  )
}

export default Feed;