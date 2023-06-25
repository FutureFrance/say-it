import Feed from "@/components/feed";
//import TestUpload from "@/components/testUpload";
import { authOptions } from "@/lib/auth";
import { getTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"

const ServerFeed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth');
  
  const tweets = await getTweets(session.accessToken);

  return (
    <>
      <Feed session={session} tweets={tweets}/> 
      {/* <TestUpload /> */}
    </>
  )
}

export default ServerFeed;