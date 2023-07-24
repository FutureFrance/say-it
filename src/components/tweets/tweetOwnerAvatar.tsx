'use client'

import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/navigation";

export const TweetOwnerAvatar = ({ user }: { user: IUser}) => {
  const router = useRouter();

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/user/${user.id}`);
  }

  return (
    <img 
      onClick={e => handleUserClick(e)}
      src={user.avatar} 
      className="w-[40px] h-[40px] rounded-full mr-4 sm: mr-2 cursor-pointer"
      alt="tweet_owner_avatar" 
    />
  )
}

export default TweetOwnerAvatar;