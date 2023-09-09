import AppMenu from "@/components/menus/appMenu/appMenu";
import InfoMenu from "@/components/menus/infoMenu/infoMenu";
import React from "react";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#000000] h-full flex justify-center lg:px-[5%]">
      <div className="flex w-[15%] md:w-[25%] justify-center md:justify-end md:pr-[3%]">
        <AppMenu />
      </div> 

      <div className="min-h-[100vh] text-white font-thin border border-b-0 border-zinc-800 w-[85%] lg:w-[50%] md:w-[80%] max-w-[900px]">
        {children}
      </div>

      <div className="flex justify-start hidden lg:block lg:w-[25%] lg:ml-[3%]">
        <InfoMenu />
      </div>
    </div>
  )
}