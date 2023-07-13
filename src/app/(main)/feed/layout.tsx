import AppMenu from "@/components/menus/appMenu/appMenu"
import InfoMenu from "@/components/menus/infoMenu"
import StickyTitle from "@/components/ui/errors/stickyTitle"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // sm:p-0
    <> 
      <div className="flex justify-center w-[25%]">
        <AppMenu />
      </div>
      <div className="text-white font-thin border border-zinc-800 w-[50%]">
        <StickyTitle title="Feed"/>
        { children }
      </div>
      <div className="w-[25%] flex justify-center h-[100vh]">
        <InfoMenu />
      </div>
    </>
  )
}
