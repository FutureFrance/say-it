import { Dispatch, ReactNode } from "react";

type IProps = { 
  children: ReactNode, 
  setModalOn: Dispatch<boolean> 
}

const Modal = ({ children, setModalOn }: IProps) => {
  return (
    <div 
      className="overlay select-none fixed top-0 left-0 h-[100%] w-[100%] flex items-center justify-center text-white"
      style={{backgroundColor: 'rgba(62, 65, 68, 0.5)'}}
      onClick={() => setModalOn(false)}  
    >
      {children}
    </div>
  )
}

export default Modal;