'use client'

import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  session: Session;
  notification: INotification;
}

const LikeNotification = ({ session, notification }: Props) => {
  const router = useRouter();

  return (
    <Link href={`/tweet/${notification.action_user.username}/${notification.tweet?.id}`}>
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
            onClick={(e) => { e.preventDefault(); router.push(`/user/${notification.action_user.username}`)}} 
            src={notification.action_user.avatar} 
            className="w-[32px] h-[32px] rounded-full mb-4"
            alt="profile-image" 
          />
          <p className="mb-2">
            <span className="font-semibold hover:underline">{notification.action_user.name} </span>
            liked your post
          </p>

          <p className="font-normal">{notification.tweet?.text_body}</p>
        </div>
      </div>
    </Link>
  )
}

export default LikeNotification;