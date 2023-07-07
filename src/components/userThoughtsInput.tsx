'use client'

import { createTweet } from "@/services/tweets.service";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useContext, useRef, useState } from "react";
import TweetButton from "./buttons/tweetButton";
import PopUpMessage from "./ui/errors/popUpMessage";
import { useRouter } from "next/navigation";
import { TweetContext } from "@/context/tweetContext";

type IProps = { 
  session: Session; 
  inputId: string;
  tweetParentId: number | null; 
  toReply?: boolean;
}

export const UserThoughtsInput = ({ session, inputId, tweetParentId, toReply = false }: IProps) => {
  const { setTweets } = useContext(TweetContext); 
  const [tweetMessage, setTweetMessage] = useState<string>("");
  const [files, setFiles] = useState<Array<File>>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDivider, setShowDivider] = useState<boolean>(false);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTweetSubmit = async () => {
    try {
      if (files.length < 1 && tweetMessage === "") return setError("Tweet length must be at least 1 or at least one file");
      if (files && files?.length > 4) return setError("Too many files, max 4"); 

      const newTweet = await createTweet(session.accessToken, tweetMessage, tweetParentId, files);

      setTweetMessage("");
      setFiles([]);
      
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (!toReply) setTweets(prev => [newTweet, ...prev]);
    } catch(err: any) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
      }
    }
  }

  const deleteImage = (fileName: string) => {
    if (fileInputRef.current?.files && files) {
      const _files = fileInputRef.current.files;
      const dt = new DataTransfer()
      
      for (let i = 0; i < _files.length; i++) {
        const file = _files[i]

        if (fileName !== file.name) dt.items.add(file); 
      }
      
      fileInputRef.current.files = dt.files;
      setFiles(prev => prev.filter(file => file.name !== fileName))
    }
  }

  return (
    <div className="flex p-4 pb-0">
      <div 
        className="tweet_owner_profile_photo max-w-2 max-h-2 mr-4 cursor-pointer" 
        onClick={() => router.push(`/user/${session.user.id}`)}
      >
        <img 
          src={session.user.avatar} 
          className="rounded-full object-cover w-8 h-8" 
          alt="tweet_owner_avatar" 
        />
      </div>

      <div className="w-[100%]">
        <textarea 
          className="color-black bg-[#000000] focus:outline-none max-h-16 w-[100%] resizable-textarea resize-none" 
          placeholder="What's happening?!"
          value={tweetMessage}
          onChange={(e) => setTweetMessage(e.target.value)}
          onFocus={() => setShowDivider(true)}
        />
        
        {
          files && (
            <div className="max-h-[500px] max-w-[600px] flex"> 
              {
                Array.from(files).map((file: File) => {
                  return (
                    <div key={file.name} className="max-w-[515px] max-h-[515px] relative">
                      <img 
                        key={file.name} 
                        src={URL.createObjectURL(file)} 
                        className="w-full rounded-md object-cover h-[100%] cursor-pointer" 
                        alt={file.name} 
                      />
                      <div 
                        className="absolute p-2 top-2 right-2 opacity-70 rounded-full cursor-pointer bg-mid_black hover:bg-light_black"
                        onClick={() => deleteImage(file.name)}
                      >
                        <img src="/assets/x_icon.png" className="w-[10px] h-[10px]" />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        }

        { showDivider && <div className="border w-[100%] border-zinc-800 my-2"></div> }

          <div className="user_actions flex justify-between items-center">
            <div className="relative">
              <label htmlFor={inputId} className="flex w-[35px]">
                <input 
                  id={inputId}
                  className="opacity-0 w-[35px] h-[35px] inset-0 w-full" 
                  type="file" 
                  max={4}
                  multiple 
                  onChange={e => setFiles(e.target.files ? Array.from(e.target.files) : [])}
                  //accept=".jpeg,.png.,.jpg,.mp4,.mp3,.svg"
                  ref={fileInputRef}
                />

              <img 
                className="absolute top-0 left-0 cursor-pointer w-[35px] h-[35px] hover:bg-neutral-800 p-2 rounded-full" 
                src="/assets/image_icon.png" 
                alt="image icon" 
              />
            </label>
          </div>

          <TweetButton onClickAction={() => handleTweetSubmit()}/>
        </div>
      </div>
      { error && 
        <PopUpMessage 
          text={error} 
          setText={setError}
          iconSrc="/assets/error_info.png"
        /> 
      }
    </div>
  )
}

export default UserThoughtsInput;