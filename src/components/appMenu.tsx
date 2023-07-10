import MenuOption from "./appMenu/menuOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppMenuTweetButton from "./appMenuTweetButton";
import UserActionsModal from "./appMenu/userActionModal";

export const AppMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth');

  return (
    <>
      <div className="col-span-1 flex justify-center">
        <div className="fixed h-[100vh]">
          <div className="flex flex-col text-white font-thin justify-center">
            <MenuOption 
              optionText=""
              urlTarget="/feed"
              imgSource="/assets/app_menu/logo.png"
              styles="hover:bg-neutral-900 hover:rounded-full transition-colors duration-700 p-2 flex items-center"
            />

            <MenuOption 
              optionText="Feed"
              urlTarget="/feed"
              imgSource="/assets/app_menu/home_icon.svg"
              styles="transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]"
            />

            <MenuOption 
              optionText="Profile"
              urlTarget="/profile"
              imgSource="/assets/app_menu/profile_icon.png"
              styles="transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]"
            /> 

            <MenuOption 
              optionText="Notifications"
              urlTarget="/notifications"
              imgSource="/assets/notifications_icon.png"
              styles="transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out gap-[20px]"
            /> 

            <AppMenuTweetButton session={session}/>
          </div>
        </div>
        <div className="bottom-100 fixed bottom-5 justify-between transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out rounded-full p-[10px]"> 
          <div className="flex justify-between items-center gap-4">
            <div className="flex gap-4">
              <img className="w-6 h-6 rounded-full cursor-pointer" src={session.user.avatar} alt="" />
              <p className="text-white text-sm">@{session.user.first_name}</p>
            </div>
            
            <UserActionsModal session={session}/>
          </div>
        </div> 
      </div>
    </>
  )
}

export default AppMenu;