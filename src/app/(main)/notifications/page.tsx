import NotificationsSection from "@/components/notifications/notificationSections";
import StickyTitle from "@/components/ui/errors/stickyTitle";
import { authOptions } from "@/lib/auth";
import { getUserNotifications } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Notifications = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/notifications');
  console.log("RENDERED /notifications")
  const fetchedNotifications = await getUserNotifications(session.accessToken);

  return (
    <>
      <StickyTitle title="Notifications"/>
      <NotificationsSection 
        session={session} 
        fetchedUserNotifications={fetchedNotifications.data.notifications}
      />
    </>
  )
}

export default Notifications