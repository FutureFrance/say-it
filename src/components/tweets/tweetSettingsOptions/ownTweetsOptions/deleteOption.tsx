import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

type Props = {
  setWarningModal: Dispatch<SetStateAction<boolean>>;
}

const DeleteOption = ({ setWarningModal }: Props) => {
  const deleteOptionClick = useCallback((e: MouseEvent) => { 
    e.stopPropagation();
    setWarningModal(true); 
  }, []);

  useEffect(() => {
    const deleteOption = document.getElementById("tweet_settings_delete_option");
    deleteOption?.addEventListener('click', deleteOptionClick);

    return () => {
      deleteOption?.removeEventListener('click', deleteOptionClick);
    }
  }, []);
  

  return (
    <div 
      className="flex gap-2 items-center px-4 py-2 hover:bg-hover_tweet_gray"
      id="tweet_settings_delete_option"
    >
      <img className="h-[18px]" src="/assets/trash_icon.png" alt="" />
      <span className="text-warning_red text-[15px] font-semibold">Delete</span>
    </div>
  )
}

export default DeleteOption;