import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth"
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";

type IProps = {
  session: Session;
  tweet: ITweet;
}

export const Tweet = ({ session, tweet }: IProps) => {
  const leftMedia: Array<IMedia> = [];
  const rightMedia: Array<IMedia> = [];

  tweet.media?.forEach((media, index) => {
    if (index % 2 === 0) {
      leftMedia.push(media);
    } else {
      rightMedia.push(media);
    }
  });

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
            tweet.media?.length === 1 
            ?
              <img 
                className={`w-[100%] h-[100%]`} 
                key={tweet.media[0].id} 
                src={tweet.media[0].path} 
              />
            :
              <>
                <div className="w-[50%]">
                  {leftMedia.map((media) => (
                    <img 
                      className={`object-cover w-[100%] ${leftMedia.length > 1 ? 'h-[50%]' : 'h-[100%]'}`} 
                      key={media.id} 
                      src={media.path} 
                    />
                  ))}
                </div>

                <div className="w-[50%]">
                  {rightMedia.map((media) => (
                    <img
                      className={`object-cover w-[100%] ${rightMedia.length > 1 ? 'h-[50%]' : 'h-[100%]'}`} 
                      key={media.id} 
                      src={media.path} 
                    />
                  ))}
                </div>
              </> 
          }
        </div>

        <TweetStatistics tweet={tweet} />
      </div>
    </div>
  )
}

export default Tweet;
