'use client'

import { ChangeEvent, Dispatch, useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { createTweet } from "@/services/tweets.client.service";
import TweetButton from "../buttons/tweetButton";
import PopUpMessage from "../ui/errors/popUpMessage";
import { TweetContext } from "@/context/tweetContext";
import { incrementRepliesCount } from "@/redux/features/tweetStatisticsSlice";
import { imagesExtensionsWhitelist, videoExtensionsWhitelist } from "@/constants/global.constants";

type Props = { 
  session: Session; 
  inputId: string;
  tweetParentId: number | null; 
  inputPlaceholder?: string;
  buttonText?: string;
  toReply?: boolean;
  setModalOn?: Dispatch<boolean>;
}

export const UserThoughtsInput = ({ 
  session, 
  inputId, 
  tweetParentId, 
  inputPlaceholder = "What's happening?!", 
  buttonText,
  toReply = false,
  setModalOn 
}: Props) => {
  const { setTweets } = useContext(TweetContext); 
  const [tweetMessage, setTweetMessage] = useState<string>("");
  const [files, setFiles] = useState<Array<File>>([]);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [showDivider, setShowDivider] = useState<boolean>(false);

  const dispatch = useDispatch();

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTweetSubmit = async () => {
    try {
      if (files.length < 1 && tweetMessage === "") return setNotificationMessage("Tweet length must be at least 1 or at least one file");

      const response = await createTweet(session.accessToken, tweetMessage, tweetParentId, files);

      setTweetMessage("");
      setFiles([]);

      if (fileInputRef.current) fileInputRef.current.value = '';
      if (!toReply) setTweets(prev => [...prev, response.data.tweet]);

      if(tweetParentId) {
        dispatch(incrementRepliesCount({ tweetId: tweetParentId }));

        if(setModalOn) setModalOn(false);
      }

      setNotificationMessage(response.data.successMessage); 
      setNotificationMessage("");
    } catch(err: any) {
      if (err instanceof AxiosError) {
        setNotificationMessage(err.response?.data.message);
      }
    }
  }

  const handleAddMedia = (e: ChangeEvent<HTMLInputElement>) => {
    let numberOfVideoFiles = 0;

    if (e.target.files) {
      if (e.target.files.length > 4) return setNotificationMessage("Too many files, max 4 photos or 1 video");

      for (let i = 0; i < e.target.files.length; i++) {
        const individualFile = e.target.files.item(i);

        if (individualFile) {
          const placeholder = individualFile.name.split('.');
          const fileExtenstion = placeholder[placeholder?.length - 1];

          if (videoExtensionsWhitelist.includes(fileExtenstion)) numberOfVideoFiles += 1;
        }
      }

      if (numberOfVideoFiles > 1 && e.target.files.length > 1) return setNotificationMessage("Please choose only 1 video or 4 photos for upload");
    } 
    
    setFiles(e.target.files ? Array.from(e.target.files) : []);
    setNotificationMessage(null); 
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
    <div className="flex p-2 pb-0 mb-2 gap-4 pt-4 h-[100%]">
      <div 
        className="tweet_owner_profile_photo w-[40px] h-[40px] cursor-pointer" 
        onClick={() => router.push(`/user/${session.user.username}`)}
      >
        <img 
          src={session.user.avatar} 
          className="rounded-full object-cover w-[100%] h-[100%]" 
          alt="tweet_owner_avatar" 
        />
      </div>

      <div className="w-[90%] min-h-[120px] flex flex-col justify-between">
        <div className="">
          <textarea 
            className="color-black bg-[#000000] focus:outline-none h-[100%] w-[100%] resizable-textarea resize-none text-lg font-normal" 
            placeholder={inputPlaceholder}
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            onFocus={() => setShowDivider(true)}
          />
        </div>
        <div>
          {
            files && (
              <div className="max-h-[200px] flex"> 
                {
                  Array.from(files).map((file: File) => {
                    return (
                    
                      <div key={file.name} className="w-full max-h-[515px] relative">
                        { imagesExtensionsWhitelist.includes(file.name.split('.')[file.name.split('.').length - 1])
                          ? 
                            <img 
                              key={file.name} 
                              src={URL.createObjectURL(file)} 
                              className="rounded-md object-cover cursor-pointer h-[100%] w-[100%]" 
                              alt={file.name} 
                            />
                          : videoExtensionsWhitelist.includes(file.name.split('.')[file.name.split('.').length - 1])
                            ? <video 
                                key={file.name} 
                                src={URL.createObjectURL(file)} 
                                width={'200px'}
                                height={'200px'}
                                className="rounded-md object-cover cursor-pointer h-[100%] w-[100%]" 
                                controls
                              />
                            : <></>
                        }

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
            <div className="user_actions flex justify-between items-center w-[100%]">
              <div className="relative">
                <label htmlFor={inputId} className="flex w-[35px]">
                  <input 
                    id={inputId}
                    className="opacity-0 w-[35px] h-[35px] inset-0 w-full" 
                    type="file" 
                    max={4}
                    multiple 
                    onChange={e => handleAddMedia(e)}
                    //accept=".jpeg,.png.,.jpg,.mp4,.mp3,.svg"
                    ref={fileInputRef}
                  />

                  <img 
                    className="absolute top-0 left-0 cursor-pointer w-[32px] h-[32px] hover:bg-neutral-800 p-[6px] rounded-full" 
                    src="/assets/image_icon.png" 
                    alt="image icon" 
                  />
                </label>
              </div>

              <TweetButton 
                buttonText={buttonText}
                message={tweetMessage}
                numbersOfFiles={files.length}
                onClickAction={() => handleTweetSubmit()} 
              />
            </div>
        </div>
      </div>
      { notificationMessage && 
        <PopUpMessage 
          text={notificationMessage} 
          setText={setNotificationMessage}
          bgColor="[#1d9bf0]"
        /> 
      }
    </div>
  )
}

export default UserThoughtsInput;