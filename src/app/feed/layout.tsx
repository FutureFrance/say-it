import AppMenu from "@/components/appMenu"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000]">
      <div className="container grid grid-cols-4">
        <AppMenu />
        { children }
      </div>
    </div>
  )
}
