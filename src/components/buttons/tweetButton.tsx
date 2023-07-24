const TweetButton = ({ onClickAction, styles = '' }: { onClickAction: () => void, styles?: string }) => {
  return (
    <button 
      className={`bg-sky-500/75 py-[6px] px-[16px] rounded-[50px] flex-right text-lg font-semibold ${styles}`}
      onClick={onClickAction}
    >
      Tweet
    </button>
  )
}

export default TweetButton;