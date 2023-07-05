import { IUser } from "@/interfaces/user.interface";

export const TweetOwnerAvatar = ({ user }: { user: IUser}) => {
  return (
    <img 
      onClick={(e) => e.stopPropagation()}
      src={user.avatar} 
      className="w-8 h-8 rounded-full mr-4 sm: mr-2 cursor-pointer"
      alt="tweet_owner_avatar" 
    />
  )
}

export default TweetOwnerAvatar;