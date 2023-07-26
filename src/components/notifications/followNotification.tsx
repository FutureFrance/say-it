import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";

type IProps = {
  session: Session;
  notification: INotification;
}

const FollowNotification = ({ session, notification }: IProps) => {
  return (
    <div className="flex cursor-pointer">
      <div className="mr-4">
        <img 
          src="/assets/person_icon.png" 
          className="w-[30px] h-[30px] mx-2"
          alt="person_icon" 
        />
      </div>
      <div className="mb-2">
        <img 
          src={notification.action_user.avatar} 
          className="w-[32px] h-[32px] rounded-full mb-4"
          alt="profile-image" 
        />
        <p>
          <span className="font-semibold">{notification.action_user.first_name} </span>
          followed you
        </p>
      </div>
    </div>
  )
}

export default FollowNotification;