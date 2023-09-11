import TweetView from "@/components/tweets/tweetView";
import TweetsSection from "@/components/tweets/tweetsSection";
import StickyTitle from "@/components/ui/errors/stickyTitle";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getTweet } from "@/services/tweets.client.service";
import { getTweetReplies } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TweetPage = async ({ params }: { params: { username: string, tweetId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth?callbackUrl=/tweet/${params.username}/${params.tweetId}`);

  const tweetInfo = await getTweet(session.accessToken, params.username, params.tweetId);

  return (
    <TweetProvider fetchedTweetsServer={tweetInfo.tweets} >
      <section className="text-white font-thin border border-zinc-800 col-span-2">
        <StickyTitle title="Tweet"/>
        <TweetView 
          session={session} 
          tweet={tweetInfo.parentTweet}
        />

        {tweetInfo.tweets.length > 0 && (
          <TweetsSection 
            session={session} 
            fetchNewTweets={getTweetReplies}
            funcArgs={[session.accessToken, tweetInfo.parentTweet.id]}
          />
        )}
      </section>
    </TweetProvider >
  )
}

export default TweetPage;
