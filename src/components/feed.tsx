'use client'

import { ITweet } from "@/interfaces/tweet.interface";
import { Session } from "next-auth";
import UserThoughtsInput from "./userThoughtsInput";
import Tweets from "./tweets/tweets";

type IProps = {
  tweets: Array<ITweet>, 
  session: Session
}

const Feed = ({ tweets, session }: IProps) => {
  return (
    <section className="text-white font-thin border border-zinc-800 col-span-2 max-w-[800px]">
      <UserThoughtsInput session={session}/>
      <Tweets tweets={tweets} session={session}/>
    </section>
  )
}

export default Feed;