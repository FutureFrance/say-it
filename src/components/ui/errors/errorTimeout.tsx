import { loginFormType, registerFormType } from "@/validations/authForm";
import { Dispatch, SetStateAction, useEffect } from "react";

type IErrorTimeout = {
  timeout: number;
  error: string | undefined;
  setError: Dispatch<SetStateAction<registerFormType | loginFormType>>;
}

const ErrorTimeout = ({ timeout, error, setError }: IErrorTimeout) => {
  useEffect(() => {
    const placedTimeout = setTimeout(() => {
      setError({});
    }, timeout);

    return () => {
      clearTimeout(placedTimeout)
    }
  }, []);

  return (
    <div className="flex items-center pt-2">
      <img 
        className="w-[10px] h-[10px]" 
        src="/assets/error_info.png" 
        alt="err_icon" 
      />
      <p className="ml-[3%] text-red-700 text-[11px]"> {error}</p>    
    </div>
  )
}

export default ErrorTimeout;