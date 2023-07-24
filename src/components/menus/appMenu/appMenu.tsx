import MenuOption from "./menuOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppMenuTweetButton from "../../buttons/appMenuTweetButton";
import UserActionsModal from "../../modals/userActionModal";
import SseConnector from "@/components/sseConnector";
import { NotificationOption } from "@/components/ui/notificationMenuOption";

export const AppMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth');

  return (
    <>
    <SseConnector session={session}/>
    {/* sm:border-r border-zinc-700 pr-4 */}
      <div className="fixed top-[10px] h-[100vh] gap-2">  
        <div className="flex flex-col text-white font-thin justify-center">
          <MenuOption 
            optionText=""
            urlTarget="/feed"
            imgSource="/assets/app_menu/logo.png"
            styles="hover:bg-neutral-900 hover:rounded-full transition-colors duration-700 flex items-center"
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

          <NotificationOption />

          <AppMenuTweetButton session={session}/>
        </div>
      </div>

      <div className="bottom-100 fixed bottom-2 justify-between transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out rounded-full p-[10px]"> 
        <div className="flex justify-between items-center gap-4"> 
        {/* sm:gap-0 sm:hidden*/}
          <div className="flex gap-4"> 
            <img className="w-6 h-6 rounded-full cursor-pointer" src={session.user.avatar} alt="" />
            <p className="text-white text-sm">@{session.user.first_name}</p>
          </div>
          
          <UserActionsModal session={session}/>
        </div>
      </div> 
    </>
  )
}

export default AppMenu;