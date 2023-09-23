'use client'

import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { useCallback, useState } from "react";
import { Session } from "next-auth";
import TweetModal from "../modals/tweetModal";
import { AxiosError } from "axios";
import { deleteLike, likeTweet } from "@/services/likes.service";
import PopUpMessage from "../ui/errors/popUpMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { likeATweet, unlikeATweet } from "@/redux/features/tweetStatisticsSlice";
import { bookmarkATweet, unBookmarkATweet } from "@/redux/features/tweetStatisticsSlice";
import { bookmarkTweet, deleteBookmark } from "@/services/tweets.client.service";
import TweetLikesModal from "../modals/tweetLikesModal";
type Props = {
  fetchedTweet: ITweet; 
  session: Session; 
  individualTweet?: boolean; 
  iconSpacing?: string;
}

export const TweetStatistics = ({ fetchedTweet, session, individualTweet = false, iconSpacing = "justify-between" }: Props) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showTweetLikes, setShowTweetLikes] = useState<boolean>(false);

  const tweetLikeCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.likes_count);
  const tweetRepliesCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.replies_count);
  const tweetViewsCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.views_count);
  const tweetBookmarksCount = useAppSelector<number>(state => state.persistedReducer.tweets[fetchedTweet.id]?.bookmarks_count);

  const isTweetLiked = useAppSelector<boolean>(state => state.persistedReducer.tweets[fetchedTweet.id]?.liked);
  const isTweetBookmarked = useAppSelector<boolean>(state => state.persistedReducer.tweets[fetchedTweet.id]?.bookmarked);
  
  const tweetLikeId = useAppSelector<number | undefined>(state => state.persistedReducer.tweets[fetchedTweet.id]?.likeId);
  const tweetBookmarkId = useAppSelector<number | undefined>(state => state.persistedReducer.tweets[fetchedTweet.id]?.bookmarkId);
  
  const dispatch = useAppDispatch();

  const handleCommentClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    setIsModalOn(true);
  }

  const handleLikeClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (isTweetLiked) {
        await deleteLike(session.accessToken, tweetLikeId as number, fetchedTweet.id);

        dispatch(unlikeATweet({ tweetId: fetchedTweet.id}));
      } else {
        const likedTweetResponse = await likeTweet(session.accessToken, fetchedTweet.id);

        dispatch(likeATweet({ tweetId: likedTweetResponse.id, likeId: likedTweetResponse.likeId as number }));
      }
    } catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  const handleBookmarkClick = async (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (isTweetBookmarked) {
        await deleteBookmark(session.accessToken, tweetBookmarkId as number);

        dispatch(unBookmarkATweet({ tweetId: fetchedTweet.id }));
      } else {
        const bookmarkedTweet = await bookmarkTweet(session.accessToken, fetchedTweet.id);

        dispatch(bookmarkATweet({ tweetId: bookmarkedTweet.tweet.id, bookmarkId: bookmarkedTweet.id as number }));
      }
    } catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  const formatDate = useCallback((inputDate: Date): string => {
    const timeString = inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const monthString = inputDate.toLocaleString('default', { month: 'short' });
    const dayOfMonth = inputDate.getDate();
    const year = inputDate.getFullYear();

    return `${timeString} · ${monthString} ${dayOfMonth}, ${year} ·`;
  }, []);

  return (
    <>
      {individualTweet &&
        <>
          <div className="flex min-h-[35px] text-[15px] leading-5 text-[white] gap-[4px] font-normal">
            <time 
              className="hover:underline text-zinc-500" 
              dateTime={fetchedTweet.created_at}
            >
              {formatDate(new Date(fetchedTweet.created_at))}
            </time>

            <div>
              <span className="font-semibold">{tweetViewsCount}</span>
              <span className="text-zinc-500 ml-[4px] font-normal">Views</span>
            </div>
          </div>

          <div className="border w-[100%] border-zinc-800"></div>

          <div className="flex items-center h-[45px] text-sm font-normal gap-4">
            <div className="">
              <span className="font-semibold">{tweetRepliesCount}</span>
              <span className="hover:underline text-zinc-500 ml-[4px]">Replies</span>
            </div>

            <div className="cursor-pointer" onClick={() => setShowTweetLikes(true)}>
              <span className="font-semibold">{tweetLikeCount}</span>
              <span className="hover:underline text-zinc-500 ml-[4px]">Likes</span>
            </div>

            <div className="">
              <span className="font-semibold">{tweetBookmarksCount}</span>
              <span className="hover:underline text-zinc-500 ml-[4px]">Bookmarks</span>
            </div>
          </div>

          <div className="border w-[100%] border-zinc-800"></div>
        </>
      }

      <div className={`w-full flex ${iconSpacing} items-center select-none ${individualTweet ? 'h-[45px]' : ''}`}>
        <TweetsStat 
          text={tweetRepliesCount}
          imgSrc="/assets/tweet_statistics/comments_icon.png"
          textHoverStyles='text-sky-400 transition-colors duration-300 ease-in-out'
          imgHoverStyles='bg-hover_comment_blue transition-colors duration-300 ease-in-out'
          clickAction={handleCommentClick}
          individualTweet={individualTweet}
        />

        <TweetsStat 
          text={tweetLikeCount}
          isOn={isTweetLiked}
          imgSrc="/assets/tweet_statistics/heart_icon.png"
          textHoverStyles='text-tweet_like transition-colors duration-300 ease-in-out'
          imgHoverStyles='bg-hover_like_red transition-colors duration-300 ease-in-out'
          clickAction={handleLikeClick}
          individualTweet={individualTweet}
        />

        <TweetsStat 
          text={tweetViewsCount}
          imgSrc="/assets/tweet_statistics/bar_chart_icon.png" 
          textHoverStyles='text-neutral-400 transition-colors duration-300 ease-in-out'
          imgHoverStyles='bg-hover_view_gray transition-colors duration-300 ease-in-out'
          individualTweet={individualTweet}
        />

        <TweetsStat 
          isOn={isTweetBookmarked}
          imgSrc="/assets/tweet_statistics/bookmark_icon.svg" 
          textHoverStyles='text-sky-400 transition-colors duration-300 ease-in-out'
          imgHoverStyles='bg-hover_comment_blue transition-colors duration-300 ease-in-out'
          clickAction={handleBookmarkClick}
          individualTweet={individualTweet}
        />

        { showTweetLikes && 
          <TweetLikesModal 
            setModal={setShowTweetLikes} 
            session={session}
            tweetId={fetchedTweet.id}
          />
        }

        { isModalOn && 
          <TweetModal 
            session={session} 
            setModalOn={setIsModalOn} 
            modalOn={isModalOn}
            inputId="comment_file_input" 
            parentTweet={fetchedTweet} 
            toReply={true}
          />
        }

        {
          apiError && <PopUpMessage text={apiError} setText={setApiError} />
        }
      </div>
    </>
  )
}

export default TweetStatistics;

type IStatProps = {
  clickAction?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
  imgSrc: string | undefined;
  isOn?: boolean;
  alt?: string;
  imgHoverStyles: string;
  textHoverStyles: string;
  text?: string | undefined | number;
  individualTweet: boolean;
}

export const TweetsStat = ({ 
  clickAction, 
  imgHoverStyles, 
  textHoverStyles, 
  text, 
  imgSrc, 
  alt = '', 
  isOn = false, 
  individualTweet,
}: IStatProps) => {
  const [isHoverOn, setIsHoverOn] = useState<boolean>(false);
  
  return (
    <div 
      className={`flex items-center cursor-pointer`}
      onMouseEnter={() => setIsHoverOn(true)}
      onMouseLeave={() => setIsHoverOn(false)}
      onClick={e => { clickAction ? clickAction(e) : e.stopPropagation(); e.preventDefault() }}>
      <img
        className={`${!individualTweet ? 'max-h-[25px] max-w-[25px]' : 'max-h-[30px] max-w-[30px]'} transition rounded-full p-[5px] ${isHoverOn || isOn ? imgHoverStyles : ''}`}
        src={imgSrc}
        alt={alt}
      />
      {(!individualTweet && text) && <p className={`ml-2 text-xs ${isHoverOn ? textHoverStyles : ''}`}>{text}</p>}
    </div>
  )
}

