import { IUser } from "@/types/user.interface";
import Link from "next/link";

export const TweetOwnerAvatar = ({ user }: { user: IUser}) => {
  return (
    <Link href={`/user/${user.username}`} prefetch={false} >
      <img 
        src={user.avatar} 
        className="w-[40px] h-[40px] rounded-full mr-4 sm: mr-2 cursor-pointer select-none"
        alt="tweet_owner_avatar" 
      />
    </Link>
  )
}

export default TweetOwnerAvatar;