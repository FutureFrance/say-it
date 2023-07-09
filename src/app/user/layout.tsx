import AppMenu from "@/components/appMenu"
import { TweetProvider } from "@/context/tweetContext"


export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] min-h-[100vh]">
      <div className="container grid grid-cols-4 min-h-[100vh]">
          <AppMenu />
          { children }
          <div className="col-span-1 sm:hidden"></div>
      </div>
    </div>
  )
}
  
