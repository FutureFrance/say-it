'use client'

import { createTweet } from "@/services/tweets.service";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useRef, useState } from "react";

export const UserThoughtsInput = ({ session }: { session: Session }) => {
  const [tweetMessage, setTweetMessage] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>();
  const [apiError, setApiError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTweetSubmit = async () => {
    try {
      await createTweet(tweetMessage, session.accessToken, files);

      setTweetMessage("");
      setFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch(err: any) {
      if (err instanceof AxiosError) {
        setApiError(err.response?.data.message);
      }
    }
  }

  return (
    <div className="flex p-4 pb-0">
        <div className="tweet_owner_profile_photo max-w-2 max-h-2 mr-4">
            <img 
              src={session.user.avatar} 
              className="rounded-full object-contain w-8 h-8" 
              alt="tweet_owner_avatar" 
            />
          </div>

        <div className="w-[100%]">
          <textarea 
            className="color-black bg-[#000000] focus:outline-none max-h-16 w-[100%] resizable-textarea resize-none" 
            placeholder="What's happening?!"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
          
          {
            files && (
              <div className="max-h-[500px] max-w-[600px] flex"> 
                {
                  Array.from(files).map((file: File) => {
                    return (
                      <img 
                        key={file.name} 
                        src={URL.createObjectURL(file)} 
                        className="w-full rounded-md object-contain" 
                        alt={file.name} 
                      />
                    )
                  })
                }
              </div>
            )
          }

          <div className="border w-[100%] border-zinc-800 my-2"></div>

          <div className="user_actions flex justify-between items-center">
            <div className="relative">
              <label htmlFor="file" className="flex">
                <input 
                  id='file'
                  className="opacity-0 w-[35px] h-[35px] inset-0 w-full" 
                  type="file" 
                  max={7}
                  multiple 
                  onChange={e => setFiles(e.target.files)}
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
            <button 
              className="bg-sky-500/75 py-2 px-4 rounded-full flex-right text-sm font-bold"
              onClick={() => handleTweetSubmit()}
            >
              Tweet
            </button>
          </div>
          { apiError && <p>{apiError}</p> }
        </div>
      </div>
  )
}

export default UserThoughtsInput;