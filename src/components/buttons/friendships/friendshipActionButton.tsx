'use client'

import PopUpMessage from "@/components/ui/errors/popUpMessage";
import { friendshipAction } from "@/services/friendship.service"
import { FriendshipActions } from "@/types/user.interface";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useState } from "react";

type Props = { 
  accessToken: string; 
  targetUserId: number;
  action: FriendshipActions;
  setterCount?: Dispatch<SetStateAction<number>>;
  btnStyles?: BUTTONPADDINGSIZE | string; 
}

export enum BUTTONPADDINGSIZE {
  LOW = 'px-4',
  HIGH = 'px-8'
}

const followButtonStyles = 'rounded-[22px] text-black bg-white text-sm font-semibold py-2 transition hover:bg-zinc-400 duration-300 ease-in';
const unFollowButtonStyles = 'border border-gray-500 rounded-[22px] text-white_text py-2 text-sm font-semibold hover:bg-neutral-900 transition-colors duration-700 cursor-pointer';

export const FriendshipActionButton = ({ accessToken, targetUserId, action, setterCount, btnStyles = BUTTONPADDINGSIZE.HIGH }: Props) => {
  const [apiError, setApiError] = useState<string |null>(null); 
  const [modifiedAction, setModifiedAction] = useState<FriendshipActions>(action);

  const handleFollowSubmit = async () => {
    try {
      await friendshipAction(accessToken, targetUserId, modifiedAction);
      
      if (setterCount !== undefined) setterCount(prev => modifiedAction === FriendshipActions.CREATE ? prev += 1 : prev -= 1);
      setModifiedAction(modifiedAction === FriendshipActions.CREATE ? FriendshipActions.DESTROY : FriendshipActions.CREATE)
    } catch(err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  return (
    <>
      <button
        onClick={(e) => { e.preventDefault(); handleFollowSubmit() }} 
        // className={`rounded-[22px] text-black bg-white text-sm font-semibold py-2 transition hover:bg-zinc-400 duration-300 ease-in ${btnStyles}`}
        className={modifiedAction === FriendshipActions.CREATE ? `${followButtonStyles} ${btnStyles}` :`${unFollowButtonStyles} ${btnStyles}` }
      >
        {`${modifiedAction === FriendshipActions.CREATE ? 'Follow' : 'Unfollow'}`}
      </button>

    { apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>}
    </>
  )
}

export default FriendshipActionButton;