import { ITweet } from "@/interfaces/tweet.interface";
import { Session } from "next-auth"
import TweetOwnerAvatar from "./tweetOwnerAvatar";

type IProps = {
  session: Session;
  tweet: ITweet;
}

export const Tweet = ({ session, tweet }: IProps) => {
  return (
    <>
     <div className="tweet_section pr-8 p-4 flex">
        <TweetOwnerAvatar tweet={tweet}/>
        
        <div className="tweet">
          <div className="owner_content">
            <p className="font-semibold">{`${session.user.first_name}${session.user.last_name}`}</p>
          </div>
          <div className='mb-2'>
            <p className="font-thin text-sm">{tweet.text_body}</p>
          </div>

          {
            tweet.media?.map(media => {
              return (
                <img 
                  key={media.id} 
                  src={`${media.path}`} 
                  alt="tweet_media" 
                  className="max-w-[512px] max-h-[100%] rounded-md" 
                />
              )
            })
          }
        </div>

        <div className="tweet_statistics pt-2"></div>
      </div>
    </>
  )
}

export default Tweet;