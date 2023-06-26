import { ITweet } from "@/interfaces/tweet.interface";

export const TweetOwnerAvatar = ({ tweet }: { tweet: ITweet}) => {
  return (
    <div className="tweet_owner_profile_photo max-w-8 max-h-8 mr-4 sm: mr-2">
      <img 
        src={tweet.user.avatar} 
        className="max-w-8 max-h-8 h-[100%] rounded-full" 
        alt="tweet_owner_avatar" 
      />
    </div>
  )
}

export default TweetOwnerAvatar;