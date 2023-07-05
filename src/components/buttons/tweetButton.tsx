import { Dispatch } from "react";

const TweetButton = ({ onClickAction }: { onClickAction: () => void}) => {
  return (
    <button 
    className="bg-sky-500/75 py-2 px-4 rounded-full flex-right text-sm font-bold"
    onClick={onClickAction}
  >
    Tweet
  </button>
  )
}

export default TweetButton;