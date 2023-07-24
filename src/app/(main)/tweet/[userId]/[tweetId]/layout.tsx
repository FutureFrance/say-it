import AppMenu from "@/components/menus/appMenu/appMenu"
import InfoMenu from "@/components/menus/infoMenu"
import StickyTitle from "@/components/ui/errors/stickyTitle"

export default function TweetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="text-white font-thin border border-zinc-800 w-[44%]">
      { children }
    </div>
  )
}
