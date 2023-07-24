'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import PopUpMessage from "../ui/errors/popUpMessage";

type IProps = {
  text: string;
}

const OAuthGoogle = ({ text }: IProps) => {
  const [apiError, setApiError] = useState<string | null>(null);

  const handleAuth = async () => {
    try {
      await signIn('google', { callbackUrl: '/feed'}); 
    } catch(err: any) {
      setApiError(err);
    }
  }

  return (
    <div className='w-full inline-block text-center border-[3px] border-black-400 py-1 mb-[10px] cursor-pointer' 
      onClick={() => handleAuth()}  
    >
      <div className='flex items-center'>
        <img className='ml-[7%] w-[25px] h-[25px]' src="/assets/google_logo_oauth.png" alt="google_logo" />
        <div className='w-[100%] flex justify-center'>
          <p className='max-w-max max-h-min p-0 text-sm font-medium text-slate-700'>{text}</p>
        </div>
      </div>

      { apiError && 
      <PopUpMessage 
        text={apiError} 
        setText={setApiError}
        textColor="rose-400"
        success={false}
      /> 
    }
    </div>
  )
}

export default OAuthGoogle;