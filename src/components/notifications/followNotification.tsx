import { INotification } from "@/types/notification.interface";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  session: Session;
  notification: INotification;
}

const FollowNotification = ({ session, notification }: Props) => {
  const router = useRouter();

  return (
    <Link href={`/user/${notification.action_user.username}`} prefetch={false}>
      <div className="flex cursor-pointer py-[12px] border-b border-zinc-800 text-[15px]">
        <div className="flex justify-center ml-4 w-[40px]">
          <img 
            src="/assets/person_icon.png" 
            className="w-[30px] h-[30px]"
            alt="person_icon" 
          />
        </div>
        <div className="ml-2">
          <img 
            onClick={(e) => { e.preventDefault(); router.push(`/user/${notification.action_user.username}`)}} 
            src={notification.action_user.avatar} 
            className="w-[32px] h-[32px] rounded-full mb-2"
            alt="profile-image" 
          />
          <p>
            <span className="font-bold hover:underline">{notification.action_user.name} </span>
            followed you
          </p>
        </div>
      </div>
    </Link>
  )
}

export default FollowNotification;