'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Session } from "next-auth"
import { ITweet } from "@/interfaces/tweets/tweet.interface";
import TweetOwnerAvatar from "./tweetOwnerAvatar";
import TweetStatistics from "./tweetStatistics";
import TweetMedia from "./media/tweetMedia";
import { useRouter } from "next/navigation";
import PopUpMessage from "../ui/errors/popUpMessage";
import { addViewTweet } from "@/services/tweets.client.service";
import TweetSettings from "./tweetSettings";

type Props = {
  session: Session;
  tweet: ITweet;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
}

export const Tweet = ({ session, tweet, setTweets }: Props) => {
  const [apiMessage, setApiMessage] = useState<null | string>(null);
  const [prefetched, setPrefetched] = useState(false);
  const [profilePreview, setProfilePreview] = useState<boolean>(false);

  const router = useRouter();
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
      className="pb-2 pt-[12px] px-4 flex cursor-pointer" 
      onClick={() => router.push(`/tweet/${session.user.username}/${tweet.id}`)}
      ref={tweetRef}
    >
      <div 
        className="relative h-[40px]" 
        onMouseEnter={() => setProfilePreview(true)}
        onMouseLeave={() => setProfilePreview(false)}
      >
        <TweetOwnerAvatar user={tweet.user}/>

        { profilePreview && 
          <div 
            className="absolute p-4 rounded-lg w-[300px] bg-[black] z-50 left-0 translate-x-[-50%] translate-y-[5%]"
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: '0 0 8px rgba(175, 175, 175, 0.5)' }}
          >
            <TweetOwnerAvatar user={tweet.user}/>
            <div className="flex flex-col">
              <span className="font-bold hover:underline">{tweet.user.name}</span>
              <span className="text-zinc-400">@{tweet.user.username}</span>
            </div>
            {tweet.user.bio}
          </div> 
        }
      </div>
      
      <div className="w-[100%] cursor-pointer">
        <div className="flex justify-between">
          <div className="flex leading-5 text-[15px] max-w-fit" onClick={e => handleUserClick(e)}>
            <span className="font-bold hover:underline">{tweet.user.name}</span>
            <span className="text-zinc-400">&nbsp;@{tweet.user.username} ·&nbsp;</span>
            <span className="text-sm text-zinc-400 hover:underline">{tweet.timestamp_diff}</span>
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
