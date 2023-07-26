import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";

type IProps = {
  session: Session;
  notification: INotification;
}

const LikeNotification = ({ session, notification }: IProps) => {
  return (
    <div className="flex cursor-pointer">
      <div className="mr-4 flex justify-center">
        <img 
          src="/assets/heart_icon.png" 
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
          liked your Tweet
        </p>
      </div>
    </div>
  )
}

export default LikeNotification;