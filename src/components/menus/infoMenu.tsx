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
    <div className="bg-zinc-900 w-[200px] h-[200px] rounded-[15px] fixed top-[40px] p-2" >
      <p className="font-bold text-md text-white mb-2">Who To Follow</p>
      <div>
        { usersToFollow.data.map(userToFollow => {
          return <><Link href={`http://localhost:3000/user/${userToFollow.id}`}><p className="text-white">{userToFollow.first_name}</p><br /></Link></>
        })}
      </div>
    </div>
  )
}

export default InfoMenu;