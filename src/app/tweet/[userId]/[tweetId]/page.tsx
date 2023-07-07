import { fetchTargetEnum } from "@/app/feed/page";
import Tweet from "@/components/tweets/tweet";
import TweetsSection from "@/components/tweets/tweetsSection";
import { authOptions } from "@/lib/auth";
import { getTweet } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TweetPage = async ({ params }: { params: { userId: number, tweetId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth?callbackUrl=/tweet/${params.userId}/${params.tweetId}`);

  const tweetInfo = await getTweet(session.accessToken, params.userId, params.tweetId);

  return (
    <section className="text-white font-thin border border-zinc-800 col-span-2 max-w-[600px]">
      <Tweet session={session} tweet={tweetInfo.parentTweet}/>

      {tweetInfo.tweets.length > 0 && (
        <TweetsSection 
          session={session} 
          fetchTarget={fetchTargetEnum.REPLIES} 
          targetId={tweetInfo.parentTweet.id}
        />
      )}
    </section>
  )
}

export default TweetPage;