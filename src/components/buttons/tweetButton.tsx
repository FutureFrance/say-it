'use client'

type Props = { 
  buttonText?: string;
  message?: string;
  numbersOfFiles?: number; 
  onClickAction: () => void; 
  styles?: string;
}

const TweetButton = ({ message, onClickAction, styles = '', buttonText = 'Tweet', numbersOfFiles = 0 }: Props) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        className={`bg-sky-500/75 hidden md:block py-[3px] px-[8px] md:py-[6px] md:px-[16px] rounded-[50px] flex-right text-lg font-semibold disabled ${styles} disabled:opacity-50`}
        onClick={onClickAction}
        disabled={message === undefined ? false : message.length === 0 && numbersOfFiles === 0}
      >
        { buttonText }
      </button>

      <button 
        className={`bg-sky-500/75 block md:hidden p-2 md:py-[6px] md:px-[16px] rounded-[50px] flex-right text-lg font-semibold ${styles}`}
        onClick={onClickAction}
      >
        <img className="h-[24px] w-[24px]" src="/assets/feather_icon.png" alt="" />
      </button>
    </div>
  )
} 

export default TweetButton;