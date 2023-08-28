import MenuOption from "../menuOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppMenuTweetButton from "../../buttons/appMenuTweetButton";
import UserActionsModal from "../../modals/userActionModal";
import SseConnector from "@/components/utils/sseConnector";
import { NotificationOption } from "@/components/ui/notificationMenuOption";


export const AppMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth');

  return (
    <>
    <SseConnector session={session}/>
      <div className="fixed select-none top-[10px] h-[100vh] gap-2">  
        <div className="flex flex-col text-white font-thin justify-center">
          <MenuOption 
            optionText=""
            urlTarget="/feed"
            imgSource="/assets/app_menu/logo.png"
            styles="transition hover:bg-neutral-900 hover:rounded-full transition-colors duration-700"
          />

          <MenuOption 
            optionText="Feed"
            urlTarget="/feed"
            imgSource="/assets/app_menu/home_icon.svg"
            styles="transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]"
          />

          <MenuOption 
            optionText="Profile"
            urlTarget={`/user/${session.user.id}`}
            imgSource="/assets/app_menu/profile_icon.png"
            styles="transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]"
          /> 

          <NotificationOption notificationsCount={session.user.notifications_count}/>

          <AppMenuTweetButton session={session}/>
        </div>
            
        <UserActionsModal session={session}/>
      </div>
    </>
  )
}

export default AppMenu;