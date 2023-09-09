'use client'

import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";

const ConnectionMenu = ({ targetUsername, session }: { targetUsername: string, session: Session }) => {
  const placeholderList = window.location.href.split('/');
  const [curentPath, setCurentpath] = useState(placeholderList[placeholderList.length - 1]);
  
  return (
    <div className="border-b-2 border-zinc-800 z-10 sticky top-0 bg-black bg-opacity-75 backdrop-blur-[1px]">
      <Link 
        className="ml-4 flex gap-8 items-center w-full cursor-pointer" 
        href={`/user/${session.user.username}`}
      >
        <div>
          <img className="w-8 h-8" src="/assets/left-arrow_icon.png" alt="left-arrow-icon" />
        </div>

        <div>
          <p className="font-semibold text-lg">{session.user.name}</p>
          <p className="text-zinc-500 text-sm font-normal">@{session.user.username}</p>
        </div>
      </Link>

      <div className="flex justify-center items-center select-none mt-2">
        <Link 
          onClick={() => setCurentpath("followers")}
          href={`/user/${targetUsername}/followers`}
          className="w-full hover:bg-hover_view_gray"
          prefetch={false}
        >
          <p className={`pb-2 pt-4 cursor-pointer font-medium text-center ${curentPath === 'followers' ? '' : 'text-zinc-500'}`}>Followers</p>
          
          <div className="flex justify-center">
            <div className={`bg-sky-500 px-4 py-[2px] rounded-2xl text-center w-[80px] ${curentPath === 'followers' ? '' : 'opacity-0'}`}></div>
          </div>
        </Link>

        <Link 
          onClick={() => setCurentpath("followings")}
          href={`/user/${targetUsername}/followings`}
          className="w-full hover:bg-hover_view_gray"
          prefetch={false}
        >
          <p className={`pb-2 pt-4 cursor-pointer font-medium text-center ${curentPath === 'followings' ? '' : 'text-zinc-500'}`}>Followings</p>

          <div className="flex justify-center">
            <div className={`bg-sky-500 px-4 py-[2px] rounded-2xl text-center w-[80px] ${curentPath === 'followings' ? '' : 'opacity-0'}`}></div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ConnectionMenu;