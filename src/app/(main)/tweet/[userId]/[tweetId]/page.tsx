import Tweet from "@/components/tweets/tweet";
import TweetsSection from "@/components/tweets/tweetsSection";
import StickyTitle from "@/components/ui/errors/stickyTitle";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getTweet, getTweetReplies } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TweetPage = async ({ params }: { params: { userId: number, tweetId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth?callbackUrl=/tweet/${params.userId}/${params.tweetId}`);

  const tweetInfo = await getTweet(session.accessToken, params.userId, params.tweetId);

  return (
    <TweetProvider fetchedTweets={tweetInfo.tweets} >
    <section className="text-white font-thin border border-zinc-800 col-span-2">
      <StickyTitle title="Tweet"/>
      <Tweet session={session} tweet={tweetInfo.parentTweet}/>

      {tweetInfo.tweets.length > 0 && (
        <TweetsSection 
          session={session} 
          fetchTweets={getTweetReplies}
          funcArgs={[session.accessToken, tweetInfo.parentTweet.id]}
        />
      )}
    </section>
    </TweetProvider >
  )
}

export default TweetPage;