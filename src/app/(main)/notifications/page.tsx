import NotificationsSection from "@/components/notifications/notificationSections";
import { authOptions } from "@/lib/auth";
import { getUserNotifications } from "@/services/user.service";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Notifications = async () => {
  const session = await getServerSession(authOptions); 
  if(!session) redirect('/auth/?callbackUrl=/notifications');
  console.log("RENDERED /notifications")
  const fetchedTweets = await getUserNotifications(session.accessToken);

  return (
    <NotificationsSection session={session} fetchedUserNotifications={fetchedTweets.data.notifications}/>
  )
}

export default Notifications