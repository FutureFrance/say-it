import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth"
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";

type IProps = {
  session: Session;
  tweet: ITweet;
}

export const Tweet = ({ session, tweet }: IProps) => {
  return (
    <div className="tweet pr-8 p-2 flex">
      <TweetOwnerAvatar user={tweet.user}/>
      
      <div className="tweet_content w-[100%]">
        <div className="owner_content">
          <p className="font-semibold">{`${session.user.first_name}${session.user.last_name}`}</p>
        </div>
        <div className='mb-2'>
          <p className="font-thin text-sm">{tweet.text_body}</p>
        </div>

        <div className="tweet_media mb-4 flex flex-wrap">
          {
            tweet.media?.map(media => { 
              return (
                <img 
                  key={media.id} 
                  src={`${media.path}`} 
                  alt="tweet_media" 
                  className="w-full rounded-md object-contain" 
                />
              )
            })
          }
        </div>

        <TweetStatistics tweet={tweet} />
      </div>
    </div>
  )
}

export default Tweet;