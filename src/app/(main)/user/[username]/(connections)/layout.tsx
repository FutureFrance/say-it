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
  const headersList = headers();
  const pathnameParts = headersList.get("x-invoke-path")?.split('/');

  if (!pathnameParts || !session) redirect('/auth?callbackUrl=/feed');

  return (
    <>
      <ConnectionMenu 
        targetUsername={ session.user.username }
        session={session}
        pathname={pathnameParts[pathnameParts.length - 1]}
      />
      { children }
    </>
    // implement bit different, url changes way before the data gets fetched on first load
  )
}