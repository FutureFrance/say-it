import ConnectionList from "@/components/user/connections/connectionsList";
import { authOptions } from "@/lib/auth";
import { getFollowings } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CONNECTIONS_TYPE } from "../followers/page";

const Followings = async ({ params }: { params: { username: string }}) => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect(`/auth/?callbackUrl=/user/${params.username}/followings`);

  const response = await getFollowings(session.accessToken, params.username); 

  return (
    <section>
      <ConnectionList 
        session={session}
        fetchedConnections={response.data.followings}
        targetUsername={params.username}
        connectionType={CONNECTIONS_TYPE.FOLLOWINGS}
      />
    </section>
  )
}

export default Followings;