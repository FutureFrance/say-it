import ConnectionMenu from "@/components/menus/connectionsMenu/connectionsMenu";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions); 
  if (!session) redirect('/auth?callbackUrl=/feed');

  return (
    <>
      <ConnectionMenu 
        targetUsername={ session.user.username }
        session={session}
      />
      { children }
    </>
  )
}