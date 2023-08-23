import { INotification, NotificationTypes } from "@/types/notification.interface";
import { Session } from "next-auth";
import FollowNotification from "./followNotification";
import LikeNotification from "./likeNotification";
import ReplyNotification from "./replyNotification";

type Props = {
  session: Session;
  notification: INotification;
}

const Notification = ({ session, notification }: Props) => {
  switch(notification.type) {
    case NotificationTypes.FOLLOW:
      return <FollowNotification session={session} notification={notification}/>
    case NotificationTypes.LIKE:
      return <LikeNotification session={session} notification={notification}/>
    case NotificationTypes.REPLY:
      return <ReplyNotification session={session} notification={notification}/>
  }
}

export default Notification;