'use client'

import { useState } from "react";
import Modal from "@/components/modals/modal";
import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";

type Props = { 
  tweet: ITweet, 
  leftMedia: Array<IMedia>, 
  rightMedia: Array<IMedia> 
}

const TweetMedia = ({ tweet, leftMedia, rightMedia }: Props) => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const [selectedImageSource, setSelectedImageSource] = useState<string>("");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImageSource(imageSrc); 
    setIsModalOn(true) 
  }

  return (
    <div className="tweet_media mb-4 flex flex-wrap" onClick={e => e.stopPropagation()}>
      {
        tweet.media?.length === 1 
        ?
          <img 
            className={`w-[100%] max-h-[440px] rounded-[10px] cursor-pointer object-cover select-none`} 
            onClick={() => handleImageClick(tweet.media.length > 0 ? tweet.media[0].path : "")}
            key={tweet.media[0].id} 
            src={tweet.media[0].path} 
          />
        :
          <div className="flex gap-[1px]">
            <div className={`w-[50%] max-h-[440px]`}>
              {leftMedia.map((media, i) => (
                <img 
                  className={`object-cover w-[100%] rounded-[10px] cursor-pointer select-none ${leftMedia.length > 1 ? i == 0 ? 'h-[50%] rounded-bl-none mb-[1px]' : 'h-[50%] rounded-tl-none' : 'h-[100%]'} ${leftMedia.length > 0 ? 'rounded-tr-none rounded-br-none' : ''}`} 
                  onClick={() => handleImageClick(media.path)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>

            <div className="w-[50%] max-h-[440px]">
              {rightMedia.map((media, i) => (
                <img
                  className={`object-cover w-[100%] rounded-[10px] cursor-pointer select-none ${rightMedia.length > 1 ? i == 0 ? 'h-[50%] rounded-br-none mb-[1px]' : 'h-[50%] rounded-tr-none' : 'h-[100%] rounded-br-none'} ${leftMedia.length > 0 ? 'rounded-tl-none rounded-bl-none' : ''}`} 
                  onClick={() => handleImageClick(media.path)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>
          </div> 
        }

        { isModalOn && 
          <Modal setModalOn={setIsModalOn}> 
            <img src={selectedImageSource} alt="" />
          </Modal>
        }
    </div>
  )
}

export default TweetMedia;