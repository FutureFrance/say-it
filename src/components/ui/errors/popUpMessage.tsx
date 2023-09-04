import { Dispatch, SetStateAction, useEffect } from "react";

type IPopUpTimeout = {
  timeout?: number;
  text: string | undefined;
  setText: Dispatch<SetStateAction<string | null>>;
  textColor?: string;
  bgColor?: string; 
}

const PopUpMessage = ({ timeout = 10000, text, setText, textColor = "white", bgColor = '[#1d9bf0]'}: IPopUpTimeout) => {
  useEffect(() => {
    const placedTimeout = setTimeout(() => {
      setText(null);
    }, timeout);

    return () => {
      clearTimeout(placedTimeout);
    }
  }, []);

  return (
    <div className={`flex items-center justify-center overlay select-none fixed bottom-12 left-70 z-50 bg-${bgColor} p-[10px] rounded-mds`}>
      <p className={`ml-[3%] text-${textColor} text-sm font-medium`}>{text}!</p>    
    </div>
  )
}

export default PopUpMessage;