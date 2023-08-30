'use client'

import { Session } from "next-auth";
import FriendshipsCount from "./friendships/friendshipsCount";
import { FriendshipActions } from "@/types/user.interface";
import { useState } from "react";
import FriendshipActionButton from "../buttons/friendships/friendshipActionButton";
import { IProfileInfo } from "@/types/frienships.interface";
import EditProfile from "./profile/editProfile";

type Props = { 
  session: Session, 
  targetProfileInfo: IProfileInfo
}

const UserProfileSection = ({ session, targetProfileInfo }: Props) => {
  const [followersCount, setFollowersCount] = useState<number>(targetProfileInfo.followersCount);
  const [editProfileOn, setEditProfileOn] = useState<boolean>(false);
  const [currentProfileImage, setCurrentProfileImage] = useState<string>(targetProfileInfo.user.avatar);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState<string>(targetProfileInfo.user.background);
  const [currentBio, setCurrentBio] = useState<string>(targetProfileInfo.user.bio);
  const [currentName, setCurrentName] = useState<string>(targetProfileInfo.user.name);
 
  return (
    <div className="min-h-[250px] flex flex-col">
      <div className={`background-section flex-1 h-1/2 select-none ${!currentBackgroundImage ? 'bg-hover_view_gray' : ''}`}>
        { currentBackgroundImage && <img className="w-full h-[200px] object-cover" src={currentBackgroundImage} alt="avatar_photo" /> }
      </div>
      <div className="relative p-4">
        <div className="h-[50px] flex justify-end items-center">
          {targetProfileInfo.amIfollowing === undefined
            ? <button 
                className="rounded-[22px] border-[2px] border-zinc-400/100 text-sm font-semibold px-4 py-2 transition hover:bg-zinc-900 duration-300 ease-in"
                onClick={() => setEditProfileOn(true)}
              >
                Edit profile
              </button>
            : targetProfileInfo.amIfollowing
              ?
                <FriendshipActionButton  
                  accessToken={session.accessToken}
                  targetUserId={targetProfileInfo.user.id}
                  action={FriendshipActions.DESTROY}
                  setterCount={setFollowersCount}
                />
              : 
                <FriendshipActionButton  
                  accessToken={session.accessToken}
                  targetUserId={targetProfileInfo.user.id}
                  action={FriendshipActions.CREATE}
                  setterCount={setFollowersCount}
                />
          }
        </div>
        
        <p className="text-lg font-bold">{currentName}</p>
        <p className="mb-2 text-zinc-500 text-base font-normal">@{targetProfileInfo.user.username}</p>
        <p className="mb-2 font-normal text-[15px] break-words">{currentBio}</p>

        <FriendshipsCount
          targetProfileInfo={targetProfileInfo} 
          followersCount={followersCount} 
          followingsCount={targetProfileInfo.followingsCount}
        />

        <div className="absolute top-0 left-4 h-[112px] w-[112px] translate-y-[-50%]" >
          <img 
            className="h-[100%] rounded-full object-cover border-4 border-[black] transition duration-300 ease-in-out transform hover:grayscale-[25%]"
            src={currentProfileImage} 
            alt="avatar_photo" 
          />
        </div>
      </div>  

      { editProfileOn &&
        <EditProfile 
          session={session} 
          setEditProfileOn={setEditProfileOn} 
          setCurrentProfileImage={setCurrentProfileImage}
          setCurrentBackgroundImage={setCurrentBackgroundImage}
          currentProfileImage={currentProfileImage}
          currentBackgroundImage={currentBackgroundImage}
          setCurrentName={setCurrentName}
          setCurrentBio={setCurrentBio}
        /> 
      } 
    </div>
  )
}

export default UserProfileSection;