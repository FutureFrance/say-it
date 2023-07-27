'use client'

import FriendshipActionButton from "@/components/buttons/friendships/friendshipActionButton";
import { FriendshipActions, IUser } from "@/types/user.interface";
import { Session } from "next-auth";

type IProps = { 
  profileInfo: IUser;
  session: Session;
}

const FriendshipAction = ({ profileInfo, session }: IProps) => {
  return (
    <div>
      { (profileInfo as any).amIfollowing
        ? <FriendshipActionButton  
            accessToken={session.accessToken}
            targetUserId={profileInfo.id}
            action={FriendshipActions.DESTROY}
          />
        : 
          <FriendshipActionButton  
            accessToken={session.accessToken}
            targetUserId={profileInfo.id}
            action={FriendshipActions.CREATE}
          />
      }
    </div>
  )
}

export default FriendshipAction;