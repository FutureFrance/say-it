import FollowersList from "@/components/user/followers/followersList";
import { authOptions } from "@/lib/auth";
import { getFollowers } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Followers = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth/?callbackUrl=/user/${params.username}/followers`);

  const response = await getFollowers(session.accessToken, params.username); 

  return (
    <section>
      <FollowersList 
        session={session}
        fetchedFollowersResponse={response.data}
        targetUsername={params.username}
      />
    </section>
  )
}

export default Followers;