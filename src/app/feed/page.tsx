import TweetsSection from "@/components/tweets/tweetsSection";
import UserThoughtsInput from "@/components/user/userThoughtsInput";
import { FETCHTWEETCOUNT } from "@/constants/tweets/tweet.constants";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getUserTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export enum fetchTargetEnum {
  TWEETS = 'tweets',
  REPLIES = 'replies' 
}

const ServerFeed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/feed');
  
  const tweets = (await getUserTweets(session.accessToken, session.user.id, 0, FETCHTWEETCOUNT)).tweets;

  return (
    <section>
      <TweetProvider fetchedTweets={tweets}>
        <UserThoughtsInput session={session} inputId="feed_file_input" tweetParentId={null}/>
        <TweetsSection session={session} fetchTarget={fetchTargetEnum.TWEETS} targetId={session.user.id}/>
      </TweetProvider>
    </section>
  )
}

export default ServerFeed;