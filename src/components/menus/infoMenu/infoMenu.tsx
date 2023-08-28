import SearchPeopleInput from "@/components/inputs/searchPeopleInput";
import { authOptions } from "@/lib/auth";
import { getFollowingsRecomandation, getUserProfileInfo } from "@/services/user.service";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FriendshipActions } from "@/types/user.interface";
import FriendshipActionButton from "@/components/buttons/friendships/friendshipActionButton";

const InfoMenu = async () => {
  const session = await getServerSession(authOptions); 
  if (!session) redirect('/auth')

  const [profileInfoResponse, usersToFollowResponse] = await Promise.all([
    getUserProfileInfo(session.accessToken, session.user.id),  // wrong i must have the profileInfo about each user not mine
    getFollowingsRecomandation(session.accessToken),
  ])

  return (
    <div className="top-[10px] fixed flex flex-col items-between justify-between gap-4">
      <SearchPeopleInput session={session}/>
 
      <div className="flex bg-[#16181c] h-[100%] w-[100%] rounded-[15px] p-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white">Trends For You</p>
      </div>

      <div className="bg-[#16181c] h-[100%] w-[100%] rounded-[15px] pt-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white mb-4 pl-4">Who to follow</p>
        <div className="flex flex-col gap-4">
          { usersToFollowResponse.data.length > 0 
            ? usersToFollowResponse.data.map(userToFollow => {
              return (
                <Link href={`${process.env.NEXT_PUBLIC_URL}/user/${userToFollow.id}`} key={userToFollow.id}>
                  <div className="flex justify-between items-center p-4 hover:bg-hover_follow_recommend_gray">
                    <div className="flex gap-2 items-center font-bold">
                      <img 
                        src={userToFollow.avatar} 
                        className="w-[40px] h-[40px] rounded-full cursor-pointer"
                        alt="tweet_owner_avatar" 
                      />
                      
                      <p className="text-white">{userToFollow.name}</p>
                    </div>
                  
                    <FriendshipActionButton  
                      accessToken={session.accessToken}
                      targetUserId={userToFollow.id}
                      action={FriendshipActions.CREATE}
                    />
                  </div>
                </Link>
              )
              })
            : <p className="pl-4 text-white">No Recomandations :(</p>
          }
        </div>
      </div>
    </div>
  )
}

export default InfoMenu;