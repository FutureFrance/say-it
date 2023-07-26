import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";
import Link from "next/link";

type IProps = {
  session: Session;
  notification: INotification;
}

const ReplyNotification = ({ session, notification }: IProps) => {
  console.log('asdfasfd', notification)

  return (
    <Link href={`/tweet/${notification.action_user.id}/${notification.tweet?.id}`}>
      <div className="flex cursor-pointer">
        <div className="mr-4">
          <img 
            src={notification.action_user.avatar} 
            className="w-[30px] h-[30px] mx-2 rounded-full"
            alt="person_icon" 
          />
        </div>

        <div className="mb-2">
          <p className="font-semibold">{notification.action_user.first_name}</p>
          <p className="text-sm text-zinc-400 font-thin">Replying to your Tweet</p>
          <p className="">{notification.text}</p>
        </div>
      </div>
    </Link>
  )
}

export default ReplyNotification;