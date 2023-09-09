'use client'

import FriendshipActionButton from "@/components/buttons/friendships/friendshipActionButton";
import { FriendshipActions, IUser } from "@/types/user.interface";
import { Session } from "next-auth";

type Props = { 
  targetProfileInfo: IUser & { amIfollowing: boolean };
  session: Session;
}

const FriendshipAction = ({ targetProfileInfo, session }: Props) => {
  return (
    <div>
      { targetProfileInfo.amIfollowing
        ? <FriendshipActionButton  
            accessToken={session.accessToken}
            targetUserId={targetProfileInfo.id}
            action={FriendshipActions.DESTROY}
          />
        : 
          <FriendshipActionButton  
            accessToken={session.accessToken}
            targetUserId={targetProfileInfo.id}
            action={FriendshipActions.CREATE}
          />
      }
    </div>
  )
}

export default FriendshipAction;