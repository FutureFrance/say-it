const TweetButton = ({ onClickAction, styles = '' }: { onClickAction: () => void, styles?: string }) => {
  return (
    <button 
      className={`bg-sky-500/75 py-[4px] px-[8px] rounded-[50px] flex-right text-sm font-semibold ${styles}`}
      onClick={onClickAction}
    >
      Tweet
    </button>
  )
}

export default TweetButton;