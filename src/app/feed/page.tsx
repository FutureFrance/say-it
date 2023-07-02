import Feed from "@/components/feed";
import { authOptions } from "@/lib/auth";
import { getTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ServerFeed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/feed');
  
  const tweets = (await getTweets(session.accessToken, session.user.id)).tweets;

  return (
    <Feed session={session} tweets={tweets}/> 
  )
}

export default ServerFeed;