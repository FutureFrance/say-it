import AppMenu from "@/components/menus/appMenu/appMenu"
import InfoMenu from "@/components/menus/infoMenu"
import StickyTitle from "@/components/ui/errors/stickyTitle"

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="text-white font-thin border border-zinc-800 w-[40%]">
      { children }
    </div>
  )
}
  
