import TweetsSection from "@/components/tweets/tweetsSection";
import StickyTitle from "@/components/ui/errors/stickyTitle";
import UserThoughtsInput from "@/components/user/userThoughtsInput";
import { TweetProvider } from "@/context/tweetContext";
import { authOptions } from "@/lib/auth";
import { getFeedTweets } from "@/services/tweets.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Feed = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/feed');
  console.log("feed render")
  const fetchedTweets = await getFeedTweets(session.accessToken);
  
  return (
    <section>
      <TweetProvider fetchedTweetsServer={fetchedTweets.tweets}>
        <StickyTitle title="Feed"/>
        <div className="px-4 mt-2">
          <UserThoughtsInput 
            session={session} 
            inputId="feed_file_input" 
            parentTweet={null}
            focused={true}
          />
        </div>
        <TweetsSection 
          session={session} 
          fetchNewTweets={getFeedTweets}
          funcArgs={[session.accessToken]}
          hasMoreToFetch={fetchedTweets.hasMore}
        />
      </TweetProvider>
    </section>
  )
}

export default Feed;