const TweetButton = ({ onClickAction, styles = '' }: { onClickAction: () => void, styles?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        className={`bg-sky-500/75 hidden md:block py-[3px] px-[8px] md:py-[6px] md:px-[16px] rounded-[50px] flex-right text-lg font-semibold ${styles}`}
        onClick={onClickAction}
      >
        Tweet
      </button>

      <button 
        className={`bg-sky-500/75 block md:hidden p-2 md:py-[6px] md:px-[16px] rounded-[50px] flex-right text-lg font-semibold ${styles}`}>
        <img className="h-[24px] w-[24px]" src="/assets/feather_icon.png" alt="" />
      </button>
    </div>
  )
} 

export default TweetButton;