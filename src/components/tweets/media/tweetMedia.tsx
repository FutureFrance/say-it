import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";

type IProps = { 
  tweet: ITweet, 
  leftMedia: Array<IMedia>, 
  rightMedia: Array<IMedia> 
}

const TweetMedia = ({ tweet, leftMedia, rightMedia }: IProps) => {
  return (
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
  )
}

export default TweetMedia;