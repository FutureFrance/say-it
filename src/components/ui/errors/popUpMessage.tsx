import { loginFormType, registerFormType } from "@/validations/authForm";
import { Dispatch, SetStateAction, useEffect } from "react";

type IPopUpTimeout = {
  timeout?: number;
  text: string | undefined;
  setText: Dispatch<SetStateAction<string | null>>;
  iconSrc: string;
}

const PopUpMessage = ({ timeout = 5000, text, setText, iconSrc }: IPopUpTimeout) => {
  useEffect(() => {
    const placedTimeout = setTimeout(() => {
      setText(null);
    }, timeout);

    return () => {
      clearTimeout(placedTimeout)
    }
  }, []);

  return (
    <div className="overlay select-none fixed top-8 right-8 bg-[white] p-[16px] text-white flex items-center justify-center gap-2 rounded-[8px]" onMouseEnter={() => setText(null)}>
      <img 
        className={`w-[15px] h-[15px]`} 
        src={iconSrc}
        alt="pop-up icon" 
      />
      <p className="ml-[3%] text-red-700 text-[11px] font-normal"> {text}</p>    
    </div>
  )
}

export default PopUpMessage;