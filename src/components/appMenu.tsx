import MenuOption from "./appMenu/menuOption";

export const AppMenu = () => {
  return (
    <div className="col-span-1">
      <div className="flex flex-col justify-center text-white font-thin h-[100vh] fixed">
        <MenuOption 
          optionText=""
          urlTarget="/feed"
          imgSource="/assets/app_menu/logo.png"
          styles="hover:bg-slate-700 hover:rounded-full p-2 flex items-center"
        />

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