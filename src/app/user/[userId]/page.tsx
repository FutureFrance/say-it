import TweetsSection from "@/components/tweets/tweetsSection";
import UserProfileSection from "@/components/user/userProfileSection";
import { authOptions } from "@/lib/auth";
import { getUserTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const User = async ({ params }: {params: { userId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth/?callbackUrl=/user/${params.userId}`);

  const tweets = (await getUserTweets(session.accessToken, session.user.id)).tweets;

  return (
    <section className="text-white font-thin border border-zinc-800 col-span-2 max-w-[600px]">
      <UserProfileSection session={session}/>
      <TweetsSection fetchedTweets={tweets} session={session}/>
    </section>
  )
}

export default User;