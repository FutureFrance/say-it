'use client'

import { Session } from "next-auth";
import FriendshipsCount from "./friendships/friendshipsCount";
import { FriendshipActions } from "@/types/user.interface";
import { useState } from "react";
import FriendshipActionButton from "../buttons/friendships/friendshipActionButton";
import { IProfileInfo } from "@/types/frienships.interface";

type IProps = { 
  session: Session, 
  profileInfo: IProfileInfo
}

const UserProfileSection = ({ session, profileInfo }: IProps) => {
  const [followersCount, setFollowersCount] = useState<number>(profileInfo.followersCount);

  return (
    <div className="profile-section min-h-[250px] flex flex-col">
      <div className={`background-section flex-1 h-1/2 ${!profileInfo.user.background ? 'bg-hover_view_gray' : ''}`}>
        { profileInfo.user.background && <img src={profileInfo.user.background} alt="avatar_photo" /> }
      </div>
      <div className="profile-info relative p-4">
        <div className="h-[50px] flex justify-end items-center">
          {profileInfo.amIfollowing === undefined
            ? <button className="rounded-[22px] border-[2px] border-zinc-400/100 text-sm font-semibold px-4 py-2 transition hover:bg-zinc-900 duration-300 ease-in">Edit profile</button>
            : profileInfo.amIfollowing
              ?
                <FriendshipActionButton  
                  accessToken={session.accessToken}
                  targetUserId={profileInfo.user.id}
                  action={FriendshipActions.DESTROY}
                  setterCount={setFollowersCount}
                />
              : 
                <FriendshipActionButton  
                  accessToken={session.accessToken}
                  targetUserId={profileInfo.user.id}
                  action={FriendshipActions.CREATE}
                  setterCount={setFollowersCount}
                />
          }
        </div>
        
        <p className="text-lg font-bold mb-2">{profileInfo.user.first_name}</p>

        <FriendshipsCount followersCount={followersCount} followingsCount={profileInfo.followingsCount}/>

        <div className="absolute top-0 left-4 h-[90px] w-[90px] translate-y-[-50%]" >
          <img 
            className="h-[100%] rounded-full object-cover border-zinc-950 hover:bg-zinc-900"
            src={profileInfo.user.avatar} 
            alt="avatar_photo" 
          />
        </div>
      </div>   
    </div>
  )
}

export default UserProfileSection;