'use client'

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
      className="z-50 overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white"
      style={{backgroundColor: 'rgba(62, 65, 68, 0.5)'}}
      onClick={(e) => {setWarningModal(false); e.stopPropagation()}}  
    >
      <div className="bg-[black] p-8 rounded-3xl w-[350px]">
        <p className="text-xl font-bold mb-2">{mainWarningText}</p>
        <p className="text-zinc-500 break-words mb-4 font-normal text-[15px]">{warningText}</p>

        <div 
          onClick={onClickAction}
          className="rounded-[22px] text-center bg-warning_red text-md font-semibold px-16 py-2 transition hover:opacity-80 duration-300 ease-in mb-4"
        >
          {actionText}
        </div>
        <div 
          className="rounded-[22px] text-center border-[1px] border-zinc-600/100 text-md font-semibold px-16 py-2 transition hover:bg-zinc-900 duration-300 ease-in"
          onClick={(e) => {setWarningModal(false); e.stopPropagation()}}  
        >
          Cancel
        </div>
      </div>
    </div>
  )
}

export default ActionWarningModal;