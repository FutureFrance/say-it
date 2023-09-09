import { ITweet } from "@/interfaces/tweets/tweet.interface";

const ConnectionActionOption = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div>
      <div 
        className="flex gap-2 items-center px-4 py-2 hover:bg-hover_tweet_gray"
      >
        <img className="h-[18px]" src="/assets/trash_icon.png" alt="" />
        <span className="text-[15px] font-semibold">Unfollow / follow @{tweet.user.username}</span>
      </div>
    </div>
  )
}

export default ConnectionActionOption;