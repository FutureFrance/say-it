import ConnectionList from "@/components/user/connections/connectionsList";
import { CONNECTIONS_TYPE } from "@/constants/connections";
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
      <ConnectionList 
        session={session}
        fetchedConnections={response.data.followers}
        targetUsername={params.username}
        connectionType={CONNECTIONS_TYPE.FOLLOWERS}
      />
    </section>
  )
}

export default Followers;