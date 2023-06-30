import AppMenu from "@/components/appMenu"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] min-h-[100vh]">
      <div className="container grid grid-cols-4 min-h-[100vh]">
        <AppMenu />
        { children }
      </div>
    </div>
  )
}
