import SearchPeopleInput from "../Inputs/searchPeopleInput";
import { authOptions } from "@/lib/auth";
import { getFollowingsRecomandation } from "@/services/user.service";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const InfoMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth')

  const usersToFollow = await getFollowingsRecomandation(session.accessToken);

  return (
    <div className="fixed top-[40px] flex flex-col items-between justify-between gap-4">
      <SearchPeopleInput />
 
      <div className="flex bg-[#16181c] h-[100%] w-[100%] rounded-[15px] p-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white">Trends For You</p>
      </div>

      <div className="flex bg-[#16181c] h-[100%] w-[100%] rounded-[15px] p-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white">Who To follow</p>
        { usersToFollow.data.map(userToFollow => {
          return <><Link href={`http://localhost:3000/user/${userToFollow.id}`}><p className="text-white">{userToFollow.first_name}</p><br /></Link></>
        })}
      </div>
    </div>
  )
}

export default InfoMenu;