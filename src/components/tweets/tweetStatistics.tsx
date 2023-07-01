import { ITweet } from "@/interfaces/tweets/tweet.interface";

export const TweetStatistics = ({ tweet } : { tweet: ITweet }) => {
  return (
    <div className="tweet_statistics flex justify-between items-center">
       <div className="comments">
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-[blue] rounded-full p-[2px]" 
          src="/assets/tweet_statistics/comments_icon.png" 
          alt="stats_icon" />
        <p>{tweet.comments_count}</p>
      </div>

      <div className="likes flex gap-2 items-center">
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-[red] rounded-full p-[2px]"  
          src="/assets/tweet_statistics/heart_icon.png" 
          alt="heart_icon" />
        <p className="font-size-sm">{tweet.likes_count}</p>
      </div>
      
      <div className="views">
        <img
          className="max-w-[20px] max-h-[20px] hover:bg-neutral-800 rounded-full p-[2px]" 
          src="/assets/tweet_statistics/bar_chart_icon.png" 
          alt="stats_icon" />
        <p>{tweet.views}</p>
      </div>
    </div>
  )
}

export default TweetStatistics;