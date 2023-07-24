import AppMenu from "@/components/menus/appMenu/appMenu";
import InfoMenu from "@/components/menus/infoMenu";
import SseConnector from "@/components/sseConnector";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] min-h-[100vh] flex justify-center min-w-screen px-[50px]"> 
      <div className="flex justify-center w-[28%]">
        <AppMenu />
      </div>
      {children}
      <div className="w-[28%] flex justify-center h-[100vh]">
        <InfoMenu />
      </div>
    </div>
  )
}