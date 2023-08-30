'use client'

import { IProfileInfo } from "@/types/frienships.interface";
import Link from "next/link";

export const FriendshipsCount = ({ targetProfileInfo, followingsCount, followersCount }: { targetProfileInfo: IProfileInfo, followingsCount: number,  followersCount: number }) => {
  return (
    <div className="flex gap-4">
      <Link href={`/user/${targetProfileInfo.user.username}/followings`} prefetch={false}>  
        <p className="text-sm text-neutral-300 cursor-pointer hover:underline">
          <span className="font-semibold text-sm text-white">{followingsCount} </span> 
          Following
        </p>
      </Link>
      <Link href={`/user/${targetProfileInfo.user.username}/followers`} prefetch={false}>  
        <p className="text-sm text-neutral-300 cursor-pointer hover:underline">
          <span className="font-semibold text-sm text-white">{followersCount} </span>
          { followersCount !== 1 ? 'Followers' : 'Follower'} 
        </p>
      </Link>
    </div>
  )
}

export default FriendshipsCount;