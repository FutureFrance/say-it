import FriendshipActionButton, { BUTTONPADDINGSIZE } from "@/components/buttons/friendships/friendshipActionButton";
import { GetFollower } from "@/services/user.service";
import { FriendshipActions } from "@/types/user.interface"
import { Session } from "next-auth";
import Link from "next/link"

type Props = {
  follower: GetFollower;
  session: Session;
}

const Follower = ({ follower, session }: Props) => {
  return (
    <Link key={follower.username} href={`/user/${follower.username}`} prefetch={false}>
      <div className="flex hover:bg-hover_tweet_gray p-[12px]">
        <div className="min-w-[40px] mr-[12px]">
          <img className="w-[40px] h-[40px] rounded-full" src={follower.avatar} alt="" />
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white_text font-semibold hover:underline">{follower.name}</p>
              <p className="text-base text-zinc-500 font-normal">@{follower.username}</p> 
            </div>

            { follower.amIfollowing
                ? 
                  <div onClick={e => e.preventDefault()}>
                    <FriendshipActionButton  
                      accessToken={session.accessToken}
                      targetUserId={follower.id}
                      action={FriendshipActions.DESTROY}
                      btnStyles={BUTTONPADDINGSIZE.LOW}
                    />
                  </div>
                : 
                  <div onClick={e => e.preventDefault()}>
                    <FriendshipActionButton  
                      accessToken={session.accessToken}
                      targetUserId={follower.id}
                      action={FriendshipActions.CREATE}
                      btnStyles={BUTTONPADDINGSIZE.LOW}
                    />
                  </div>
            }
          </div>
          
          <div className="mt-2" style={{ overflowWrap: 'anywhere'}}>
            <span className="text-[white] font-normal text-[15px]">{follower.bio}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Follower;