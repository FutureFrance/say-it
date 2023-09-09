'use client'

import { Dispatch, ReactNode, useEffect } from "react";

type Props = { 
  children: ReactNode;
  setModalOn: Dispatch<boolean>;
  customOnClickAction?: () => void;
  closeOnOutsideClick?: boolean;
}

const Modal = ({ children, setModalOn, customOnClickAction = () => {}, closeOnOutsideClick = true }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, []);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (closeOnOutsideClick) setModalOn(false);

    customOnClickAction(); 
    e.stopPropagation();
  }

  return (
    <div 
      className="z-50 overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white"
      style={{backgroundColor: 'rgba(62, 65, 68, 0.5)'}}
      onClick={e => handleModalClick(e)}  
    >
      {children}
    </div>
  )
}

export default Modal;