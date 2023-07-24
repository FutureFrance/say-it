'use client'

import { useAppSelector } from "@/redux/hooks"
import Link from "next/link"

export const NotificationOption = () => {
  const userNotificationCount = useAppSelector(state => state.UserNotificationsCountReducer.notificationsCount);

  return (
    <Link href="/notifications" className="max-w-min">
      <div className={`hover:bg-neutral-800 rounded-full p-2 flex items-center transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]`}>
        <div className="relative">
          <img className="max-w-[24px] max-h-[24px]" src="/assets/notifications_icon.png" alt="" />
          <div className="absolute flex items-center justify-center top-0 right-0 translate-y-[-50%] p-[2px] bg-[#1d9bf0] rounded-full text-xs font-normal h-[14px] w-[14px]">{userNotificationCount}</div>
        </div>
        <p className="font-normal text-xl">Notifications</p> 
        {/* sm:hidden */}
      </div>
    </Link>
  )
}