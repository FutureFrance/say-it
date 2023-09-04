'use client'

import { useState } from "react";
import Modal from "@/components/modals/modal";
import { IMedia, ITweet, MediaTypes } from "@/interfaces/tweets/tweet.interface";

type Props = { 
  tweet: ITweet, 
  leftMedia: Array<IMedia>, 
  rightMedia: Array<IMedia> 
}

const TweetMedia = ({ tweet, leftMedia, rightMedia }: Props) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [selectedImageSource, setSelectedImageSource] = useState<IMedia>();

  const handleImageClick = (media: IMedia) => {
    setSelectedImageSource(media); 
    setIsModalOn(true);
  }

  return (
    <div className="tweet_media mb-4 flex flex-wrap" onClick={e => e.stopPropagation()}>
      {
        tweet.media?.length === 1 
        ?
          tweet.media[0].media_type === MediaTypes.IMAGE 
            ?
              <img 
                className={`w-[100%] max-h-[440px] rounded-[10px] cursor-pointer object-cover select-none`} 
                onClick={() => handleImageClick(tweet.media[0]) }
                key={tweet.media[0].id} 
                src={tweet.media[0].path} 
              />
            : tweet.media[0].media_type === MediaTypes.VIDEO
              ?
                <video 
                  className={`w-[100%] max-h-[440px] rounded-[10px] cursor-pointer object-cover select-none`} 
                  key={tweet.media[0].id} 
                  src={tweet.media[0].path} 
                  controls
                  muted
                />
              : <></>
        :
          <div className="flex gap-[1px]">
            <div className={`w-[50%] max-h-[440px]`}>
              {leftMedia.map((media, i) => (
                <img 
                  className={`object-cover w-[100%] rounded-[10px] cursor-pointer select-none ${leftMedia.length > 1 ? i == 0 ? 'h-[50%] rounded-bl-none mb-[1px]' : 'h-[50%] rounded-tl-none' : 'h-[100%]'} ${leftMedia.length > 0 ? 'rounded-tr-none rounded-br-none' : ''}`} 
                  onClick={() => handleImageClick(media)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>

            <div className="w-[50%] max-h-[440px]">
              {rightMedia.map((media, i) => (
                <img
                  className={`object-cover w-[100%] rounded-[10px] cursor-pointer select-none ${rightMedia.length > 1 ? i == 0 ? 'h-[50%] rounded-br-none mb-[1px]' : 'h-[50%] rounded-tr-none' : 'h-[100%] rounded-br-none'} ${leftMedia.length > 0 ? 'rounded-tl-none rounded-bl-none' : ''}`} 
                  onClick={() => handleImageClick(media)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>
          </div> 
        }

        { isModalOn && 
          <Modal setModalOn={setIsModalOn}>
            <img src={selectedImageSource?.path} alt="" />
          </Modal>
        }
    </div>
  )
}

export default TweetMedia;