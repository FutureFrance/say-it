'use client'

import { useState } from "react";
import Modal from "@/components/modal";
import { IMedia, ITweet } from "@/interfaces/tweets/tweet.interface";

type IProps = { 
  tweet: ITweet, 
  leftMedia: Array<IMedia>, 
  rightMedia: Array<IMedia> 
}

const TweetMedia = ({ tweet, leftMedia, rightMedia }: IProps) => {
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
            className={`w-[100%] h-[100%] cursor-pointer`} 
            onClick={() => handleImageClick(tweet.media ? tweet.media[0].path : "")}
            key={tweet.media[0].id} 
            src={tweet.media[0].path} 
          />
        :
          <>
            <div className="w-[50%]">
              {leftMedia.map((media) => (
                <img 
                  className={`object-cover w-[100%] cursor-pointer ${leftMedia.length > 1 ? 'h-[50%]' : 'h-[100%]'}`} 
                  onClick={() => handleImageClick(media.path)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>

            <div className="w-[50%]">
              {rightMedia.map((media) => (
                <img
                  className={`object-cover w-[100%] cursor-pointer ${rightMedia.length > 1 ? 'h-[50%]' : 'h-[100%]'}`} 
                  onClick={() => handleImageClick(media.path)}
                  key={media.id} 
                  src={media.path} 
                />
              ))}
            </div>
          </> 
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