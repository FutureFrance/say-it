import MenuOption from "./appMenu/menuOption";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AppMenuTweetButton from "./appMenuTweetButton";

export const AppMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/auth');

  return (
    <>
      <div className="col-span-1">
        <div className="flex flex-col justify-center text-white font-thin h-[100vh] fixed">
          <MenuOption 
            optionText=""
            urlTarget="/feed"
            imgSource="/assets/app_menu/logo.png"
            styles="hover:bg-neutral-800 hover:rounded-full p-2 flex items-center"
          />

          <MenuOption 
            optionText="Feed"
            urlTarget="/feed"
            imgSource="/assets/app_menu/home_icon.svg"
          />

          <MenuOption 
            optionText="Profile"
            urlTarget="/profile"
            imgSource="/assets/app_menu/profile_icon.png"
          />  

          <AppMenuTweetButton session={session}/>

          <div className="h-[100%] flex items-end">
            <p>Actions</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppMenu;