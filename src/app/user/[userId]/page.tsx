import { fetchTargetEnum } from "@/app/feed/page";
import TweetsSection from "@/components/tweets/tweetsSection";
import UserProfileSection from "@/components/user/userProfileSection";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getUserTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const User = async ({ params }: {params: { userId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth/?callbackUrl=/user/${params.userId}`);

  const tweets = (await getUserTweets(session.accessToken, params.userId)).tweets;

  return (
    <TweetProvider fetchedTweets={tweets} >
      <section className="text-white font-thin border border-zinc-800 col-span-2">
        <UserProfileSection session={session}/>
        <TweetsSection 
          session={session} 
          fetchTarget={fetchTargetEnum.TWEETS} 
          targetId={params.userId}
        />
      </section>
    </TweetProvider>
  )
}

export default User;