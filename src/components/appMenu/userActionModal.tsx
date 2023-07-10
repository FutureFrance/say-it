'use client'

import { Session } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";

const UserActionsModal = ({ session }: { session: Session}) => {
  const [modalOn, setModalOn] = useState<boolean>(false);

  return (
    <div 
      className="p-1 rounded-full transition hover:bg-neutral-900 transition-colors duration-1000 ease-in-out relative"
      onClick={() => setModalOn(prev => !prev)}
    >
      <img className="w-4 h-4 cursor-pointer" src="/assets/app_menu/menu_dots_icon.png" alt="" />
      { modalOn && 
        <div className="absolute pointer-events-auto bottom-[39px] right-0 border border-zinc-800 shadow-xs shadow-white p-2 rounded-[8px]">
          <p 
            className="cursor-pointer text-xs font-medium text-slate-300 inline-block w-[120px]"
            onClick={() => signOut({ callbackUrl: '/auth', redirect: true })}
          >
            <span className="font-medium text-rose-700">
              Log-out 
            </span> @{session.user.first_name}
          </p>
        </div>
      }
    </div>
  )
}

export default UserActionsModal;