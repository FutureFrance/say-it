import MenuOption from "./appMenu/menuOption";

export const AppMenu = () => {
  return (
    <div className="text-white font-thin col-span-1 flex justify-end max-h-[100vh]">
      <div className="w-[40%] flex flex-col gap-7">
        <img src="/assets/app_menu/logo.png" alt="logo" className="max-w-[25px] max-h-[25px]"/>

        <MenuOption 
          optionText="Home"
          urlTarget="/home"
          imgSource="/assets/app_menu/home_icon.svg"
        />

        <MenuOption 
          optionText="Profile"
          urlTarget="/profile"
          imgSource="/assets/app_menu/profile_icon.png"
        />
        
        <div className="h-[100%] flex items-end">
          <p>Actions</p>
        </div>
      </div>
    </div>
  )
}

export default AppMenu;