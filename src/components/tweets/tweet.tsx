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
import ActionWarningModal from "../modals/actionWarningModal";
import TweetSettings from "./tweetSettings";

type Props = {
  session: Session;
  tweet: ITweet;
  setTweets: Dispatch<SetStateAction<Array<ITweet>>>;
}

export const Tweet = ({ session, tweet, setTweets }: Props) => {
  const [apiMessage, setApiMessage] = useState<null | string>(null);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [prefetched, setPrefetched] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const tweetRef = useRef(null);

  const leftMedia: Array<IMedia> = [];
  const rightMedia: Array<IMedia> = [];

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

  tweet.media.forEach((media, index) => {
    if (index % 2 === 0) {
      leftMedia.push(media);
    } else {
      rightMedia.push(media);
    }
  });

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    router.push(`/user/${session.user.username}`);
  }

  const handleDeleteTweet = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      await deleteTweet(session.accessToken, tweet.id);
      //  not getting the message after the deletion with that second modal
      setApiMessage("You're tweet was deleted");
      setTweets(prev => prev.filter(element => element.id !== tweet.id ));
      
      console.log("asdfasdfasdf", pathname.split('/'))
      if (pathname.split('/')[1] === "tweet") router.push("/feed");
    } catch(err) {
      if (err instanceof AxiosError) setApiMessage("Could not delete this tweet, please try again later");
    }
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
            setWarningModal={setWarningModal}
          />
        </div>

        <div className='mb-2'>
          <p className="font-[375] text-md">{tweet.text_body}</p>
        </div>
        
        <div className="mb-[12px] pr-2">
          {tweet.media.length > 0 && 
            <TweetMedia 
              tweet={tweet} 
              leftMedia={leftMedia} 
              rightMedia={rightMedia}
            /> 
          }
        </div>

        <TweetStatistics fetchedTweet={tweet} session={session}/>
      </div>
      
      {warningModal && 
        <ActionWarningModal 
          setWarningModal={setWarningModal}
          mainWarningText="Delete post ?"
          warningText="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results."
          actionText="Delete"
          onClickAction={handleDeleteTweet}
        />
      }

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
