import AppMenu from "@/components/menus/appMenu/appMenu";
import InfoMenu from "@/components/menus/infoMenu";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] min-h-[100vh] flex justify-center min-w-screen lg:px-[50px]"> 
      <div className="flex w-[15%] md:w-[27%] justify-center md:justify-end md:pr-[3%]">
        <AppMenu />
      </div>

      <div className="text-white font-thin border border-zinc-800 w-[85%] lg:w-[46%] md:w-[73%]">
        {children}
      </div>

      <div className="flex justify-start hidden lg:block lg:w-[27%] lg:pl-[3%]">
        <InfoMenu />
      </div>
    </div>
  )
}