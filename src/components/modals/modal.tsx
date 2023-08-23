'use client'

import { Dispatch, ReactNode, useEffect } from "react";

type Props = { 
  children: ReactNode, 
  setModalOn: Dispatch<boolean> 
}

const Modal = ({ children, setModalOn }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <div 
      className="z-50 overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white"
      style={{backgroundColor: 'rgba(62, 65, 68, 0.5)'}}
      onClick={(e) => {setModalOn(false); e.stopPropagation()}}  
    >
      {children}
    </div>
  )
}

export default Modal;