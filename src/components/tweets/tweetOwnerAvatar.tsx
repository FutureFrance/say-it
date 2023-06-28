import { IUser } from "@/types/user.interface";

export const TweetOwnerAvatar = ({ user }: { user: IUser}) => {
  return (
    <img 
      src={user.avatar} 
      className="w-8 h-8 rounded-full mr-4 sm: mr-2"
      alt="tweet_owner_avatar" 
    />
  )
}

export default TweetOwnerAvatar;