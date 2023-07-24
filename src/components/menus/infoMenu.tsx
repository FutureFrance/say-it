import SearchPeopleInput from "../Inputs/searchPeopleInput";

const InfoMenu = () => {
  return (
    <div className="fixed top-[40px] flex flex-col items-between justify-between gap-4">
      <SearchPeopleInput />
 
      <div className="flex bg-[#16181c] h-[100%] w-[100%] rounded-[15px] p-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white">Trends For You</p>
      </div>

      <div className="flex bg-[#16181c] h-[100%] w-[100%] rounded-[15px] p-4" style={{zIndex: 0}}>
        <p className="font-bold text-lg text-white">Who To follow</p>
      </div>
    </div>
  )
}

export default InfoMenu;