import AppMenu from "@/components/appMenu"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] grid grid-cols-3">
      <AppMenu />
      { children }
    </div>
  )
}
