'use client'

import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";
import { Session } from "next-auth"
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";
import TweetMedia from "./media/tweetMedia";
import { useRouter } from "next/navigation";

type IProps = {
  session: Session;
  tweet: ITweet;
}

export const Tweet = ({ session, tweet }: IProps) => {
  const router = useRouter();

  const leftMedia: Array<IMedia> = [];
  const rightMedia: Array<IMedia> = [];

  tweet.media?.forEach((media, index) => {
    if (index % 2 === 0) {
      leftMedia.push(media);
    } else {
      rightMedia.push(media);
    }
  });

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/user/${session.user.id}`);
  }

  return (
    <div className="tweet pr-8 p-2 flex" onClick={() => router.push(`/tweet/${session.user.id}/${tweet.id}`)}>
      <TweetOwnerAvatar user={tweet.user}/>
      
      <div className="tweet_content w-[100%] cursor-pointer">
        <div className="owner_content flex gap-2 items-center" onClick={e => handleUserClick(e)}>
          <p className="font-semibold">{`${session.user.first_name}${session.user.last_name}`}</p>
          <p className="text-xs">{ tweet.timestamp_diff }</p>
        </div>
        <div className='mb-2'>
          <p className="font-thin text-sm">{tweet.text_body}</p>
        </div>

        <TweetMedia tweet={tweet} leftMedia={leftMedia} rightMedia={rightMedia}/>
        <TweetStatistics tweet={tweet} session={session}/>
      </div>
    </div>
  )
}

export default Tweet;
