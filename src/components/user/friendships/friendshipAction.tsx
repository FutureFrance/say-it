'use client'

import FriendshipActionButton from "@/components/buttons/friendships/friendshipActionButton";
import { IProfileInfo } from "@/types/frienships.interface";
import { FriendshipActions, IUser } from "@/types/user.interface";
import { Session } from "next-auth";
import { useState } from "react";

type IProps = { 
  profileInfo: IProfileInfo;
  session: Session;
}

const FriendshipAction = ({ profileInfo, session }: IProps) => {
  const [followersCount, setFollowersCount] = useState<number>(profileInfo.followersCount);

  return (
    <div>
      { profileInfo.amIfollowing
        ? <FriendshipActionButton  
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
  )
}

export default FriendshipAction;