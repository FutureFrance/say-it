import { Session } from "next-auth";
import Link from "next/link";

const ConnectionMenu = ({ targetUsername, session }: { targetUsername: string, session: Session }) => {
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
          <Link href={`/user/${targetUsername}/followers`} prefetch={false} className="w-full">
            <p className="px-8 py-2 cursor-pointer hover:bg-hover_view_gray font-semibold text-center">Followers</p>
          </Link>

          <Link href={`/user/${targetUsername}/followings`} prefetch={false} className="w-full">
            <p className="px-8 py-2 cursor-pointer hover:bg-hover_view_gray font-semibold text-center">Followings</p>
          </Link>
        </div>
      </div>
  )
}

export default ConnectionMenu;