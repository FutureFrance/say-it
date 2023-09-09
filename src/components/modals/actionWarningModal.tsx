'use client'

import { WARNING_MODALS } from "@/constants/global.constants";
import { Dispatch, SetStateAction } from "react";

type Props = {
  mainWarningText: string;
  warningText: string;
  actionText: string;
  setWarningModal: Dispatch<SetStateAction<boolean>>;
  onClickAction: (...args: any) => void; 
}

const ActionWarningModal = ({ mainWarningText, warningText, actionText, setWarningModal, onClickAction }: Props) => {
  return (
    <div
      className="z-50 overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white cursor-auto"
      style={{backgroundColor: 'rgba(62, 65, 68, 0.5)'}}
      onClick={(e) => {setWarningModal(false); e.stopPropagation()}}  
    >
      <div 
        className="bg-[black] p-8 rounded-3xl w-[350px] cursor-auto"
        onClick={e => e.stopPropagation()}
      >
        <span className="text-xl font-bold cursor-text">{mainWarningText}</span>
        <p className="text-zinc-500 break-words my-4 font-normal text-[15px] cursor-text">{warningText}</p>

        <div 
          onClick={onClickAction}
          className="rounded-[22px] text-center bg-warning_red text-md font-semibold px-16 py-2 transition hover:opacity-80 duration-300 ease-in mb-4 cursor-pointer"
        >
          {actionText}
        </div>
        <div 
          className="rounded-[22px] text-center border-[1px] border-zinc-600/100 text-md font-semibold px-16 py-2 transition hover:bg-zinc-900 duration-300 ease-in cursor-pointer"
          onClick={(e) => { setWarningModal(false); e.stopPropagation() }}  
        >
          Cancel
        </div>
      </div>
    </div>
  )
}

export default ActionWarningModal;