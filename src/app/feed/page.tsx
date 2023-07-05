import TweetsSection from "@/components/tweets/tweetsSection";
import UserThoughtsInput from "@/components/userThoughtsInput";
import { authOptions } from "@/lib/auth";
import { getTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ServerFeed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/feed');
  
  const tweets = (await getTweets(session.accessToken, session.user.id)).tweets;

  return (
    <section className="text-white font-thin border border-zinc-800 col-span-2 max-w-[600px]">
      <UserThoughtsInput session={session}/>
      <TweetsSection fetchedTweets={tweets} session={session}/>
    </section>
  )
}

export default ServerFeed;