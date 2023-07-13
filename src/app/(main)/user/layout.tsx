import AppMenu from "@/components/menus/appMenu/appMenu"
import InfoMenu from "@/components/menus/infoMenu"
import StickyTitle from "@/components/ui/errors/stickyTitle"

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex justify-center w-[25%]">
        <AppMenu />
      </div>
      <div className="text-white font-thin border border-zinc-800 w-[50%]">
        <StickyTitle title="User"/>
        { children }
      </div>
      <div className="w-[25%] flex justify-center h-[100vh]">
        <InfoMenu />
      </div>
    </>
  )
}
  
