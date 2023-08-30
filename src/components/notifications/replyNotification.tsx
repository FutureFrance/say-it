'use client'

import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  session: Session;
  notification: INotification;
}

const ReplyNotification = ({ session, notification }: Props) => {
  const router = useRouter();

  return (
    <Link href={`/tweet/${notification.action_user.username}/${notification.tweet?.id}`} prefetch={false}>
      <div className="flex cursor-pointer">
        <div className="mr-4">
          <img 
            src={notification.action_user.avatar}
            onClick={(e) => { e.preventDefault(); router.push(`/user/${notification.action_user.username}`)}} 
            className="w-[30px] h-[30px] mx-2 rounded-full"
            alt="person_icon" 
          />
        </div>

        <div className="mb-2">
          <p className="font-bold hover:underline">{notification.action_user.name}</p>
          <p className="text-zinc-500 font-normal mb-2">
            Replying to &nbsp;

            <span 
              className="text-[#1d9bf0] hover:underline" 
              onClick={(e) => { e.preventDefault(); router.push(`/user/${session.user.username}`)}}
            >
               @{session.user.username}
            </span>
          </p>
          <p className="font-normal">{notification.text}</p>
        </div>
      </div>
    </Link>
  )
}

export default ReplyNotification;