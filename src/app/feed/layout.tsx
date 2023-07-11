import AppMenu from "@/components/appMenu"

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container min-h-[100vh] container flex min-h-[100vh] w-[100%] px-[100px] sm:p-0">
      <div className="flex justify-center w-[25%]">
        <AppMenu />
      </div>
      <div className="text-white font-thin border border-zinc-800 max-w-[800px] w-[50%]">
        { children }
      </div>
      <div className="w-[25%]">

      </div>
    </div>
  )
}
