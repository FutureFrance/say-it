'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Session } from "next-auth"
import { AxiosError } from "axios";
import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";
import TweetMedia from "./media/tweetMedia";
import { usePathname, useRouter } from "next/navigation";
import PopUpMessage from "../ui/errors/popUpMessage";
import { addViewTweet, deleteTweet } from "@/services/tweets.client.service";
import TweetSettings from "./tweetSettings";

type Props = {
  session: Session;
  tweet: ITweet;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
}

export const Tweet = ({ session, tweet, setTweets }: Props) => {
  const [apiMessage, setApiMessage] = useState<null | string>(null);
  const [prefetched, setPrefetched] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const tweetRef = useRef(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };
    
    const observer = new IntersectionObserver(addViewTweetRequest, options);
    
    if (tweetRef.current) {
      observer.observe(tweetRef.current);
    }
    
    return () => {
      if (tweetRef.current) {
        observer.unobserve(tweetRef.current);
      }
    };
  }, [prefetched, tweet.id]);

  const addViewTweetRequest = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach(async (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && !prefetched) {
        try {
          await addViewTweet(session.accessToken, tweet.id);
          setPrefetched(true);
        }
        catch(err) {
          console.log(err);
        }
      }
    })
  }

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/user/${session.user.username}`);
  }

  return (
    <div 
      className="py-2 px-4 flex cursor-pointer" 
      onClick={() => router.push(`/tweet/${session.user.username}/${tweet.id}`)}
      ref={tweetRef}
    >
      <TweetOwnerAvatar user={tweet.user}/> 
      
      <div className="w-[100%] cursor-pointer">
        <div className="flex justify-between">
          <div className="flex leading-5 text-[15px] max-w-fit" onClick={e => handleUserClick(e)}>
            <span className="font-semibold">{tweet.user.name} &nbsp;</span>
            <span className="text-zinc-500">@{tweet.user.username} ·&nbsp;</span>
            <span className="text-sm text-zinc-400">{tweet.timestamp_diff}</span>
          </div>

          <TweetSettings 
            session={session}
            tweet={tweet}
            setTweets={setTweets}
          />
        </div>

        <div className='mb-2'>
          <p className="font-[375] text-md">{tweet.text_body}</p>
        </div>
        
        <div className="mb-[12px] pr-2">
          {tweet.media.length > 0 && 
            <TweetMedia tweet={tweet} /> 
          }
        </div>

        <TweetStatistics fetchedTweet={tweet} session={session}/>
      </div>

      { apiMessage && 
        <PopUpMessage 
          text={apiMessage}
          setText={setApiMessage}
        />
      }
    </div>
  )
}

export default Tweet;
