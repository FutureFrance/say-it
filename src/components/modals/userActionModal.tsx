'use client'

import { Session } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";

const UserActionsModal = ({ session }: { session: Session}) => {
  const [modalOn, setModalOn] = useState<boolean>(false);

  return (
    <div 
      className="cursor-pointer bottom-100 fixed bottom-2 justify-center lg:justify-between transition hover:bg-neutral-900 transition-colors duration-700 ease-in-out rounded-full lg:p-[10px] p-2" 
      onClick={() => setModalOn(prev => !prev)}
    > 
      <div className="flex justify-between items-center lg:gap-2"> 
        <div className="flex lg:gap-2 gap-4"> 
          <img className="h-[40px] w-[40px] md:w-6 md:h-6 rounded-full" src={session.user.avatar} alt="" />
          <p className="hidden md:block text-white text-sm">@{session.user.first_name}</p>
        </div>
        <div 
          className="p-1 rounded-full transition hover:bg-neutral-900 transition-colors duration-1000 ease-in-out relative flex justify-center"
        >
          <img className="hidden lg:block w-4 h-4 cursor-pointer" src="/assets/app_menu/menu_dots_icon.png" alt="" />
          { modalOn && 
            <div className="absolute border cursor-pointer top-[-120%] left-0 translate-x-[0%] translate-y-[-50%] border-zinc-800 shadow-xs shadow-white p-[5px] rounded-[8px] flex items-center justify-center">
              <p 
                className="text-[11px] font-semibold text-slate-300 inline-block w-[155px] text-center"
                onClick={() => signOut({ callbackUrl: '/auth', redirect: true })}
              >
                <span className="font-bold text-rose-700">
                  Log-out 
                </span> @{session.user.first_name}
              </p>
            </div>
          }
        </div>
      </div>
    </div> 
  )
}

export default UserActionsModal;