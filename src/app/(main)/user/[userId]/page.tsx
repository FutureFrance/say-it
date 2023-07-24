import TweetsSection from "@/components/tweets/tweetsSection";
import StickyTitle from "@/components/ui/errors/stickyTitle";
import UserProfileSection from "@/components/user/userProfileSection";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getUserTweets } from "@/services/tweets.service";
import { getUserProfileInfo } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const User = async ({ params }: {params: { userId: number }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth/?callbackUrl=/user/${params.userId}`);

  const [profileInfoResponse, tweetsResponse] = await Promise.all([
    getUserProfileInfo(session.accessToken, params.userId),
    getUserTweets(session.accessToken, params.userId),
  ])

  return (
    <TweetProvider fetchedTweetsServer={tweetsResponse.tweets} >
      <section className="text-white font-thin border border-zinc-800 col-span-2">
        <StickyTitle title={profileInfoResponse.data.user.first_name}/>

        <UserProfileSection 
          session={session}
          profileInfo={profileInfoResponse.data}
        />
        
        <TweetsSection 
          fetchNewTweets={getUserTweets}
          funcArgs={[session.accessToken, params.userId]}
          session={session} 
        />
      </section>
    </TweetProvider>
  )
}

export default User;