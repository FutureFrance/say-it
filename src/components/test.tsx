'use client'

import { getFeedTweets } from "@/services/tweets.service"
import TweetsSection from "./tweets/tweetsSection"
import { Session } from "next-auth"

export const TweetsSectionProvider = ({ session }: { session: Session}) => {
  return (
    <TweetsSection 
      session={session} 
      fetchTweets={getFeedTweets}
      funcArgs={[session.accessToken]}
      // fetchTarget={fetchTargetEnum.TWEETS} 
      // targetId={session.user.id}
    />
  )
}

export default TweetsSectionProvider;