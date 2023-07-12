import TweetsSection from "@/components/tweets/tweetsSection";
import UserThoughtsInput from "@/components/user/userThoughtsInput";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getFeedTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export enum fetchTargetEnum {
  TWEETS = 'tweets',
  REPLIES = 'replies' 
}

const ServerFeed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/feed');
  
  const fetchedTweets = await getFeedTweets(session.accessToken);

  return (
    <section>
      <TweetProvider fetchedTweets={fetchedTweets.tweets}>
        <UserThoughtsInput session={session} inputId="feed_file_input" tweetParentId={null}/>
        <TweetsSection session={session} fetchTarget={fetchTargetEnum.TWEETS} targetId={session.user.id}/>
      </TweetProvider>
    </section>
  )
}

export default ServerFeed;