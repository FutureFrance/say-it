import { ITweet } from "@/interfaces/tweets/tweet.interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import DeleteOption from "./tweetSettingsOptions/ownTweetsOptions/deleteOption";
import ConnectionActionOption from "./tweetSettingsOptions/othersTweetsOptions/connectionAction";

type Props = {
  showMyTweetSettings: boolean;
  showForeignTweetSettings: boolean;
  setShowForeignTweetSettings: Dispatch<SetStateAction<boolean>>;
  setShowMyTweetSettings: Dispatch<SetStateAction<boolean>>;
  setWarningModal: Dispatch<SetStateAction<boolean>>;
  tweet: ITweet;
}

const TweetSettingsOptions = ({ 
  showMyTweetSettings, 
  showForeignTweetSettings, 
  setWarningModal, 
  tweet, 
  setShowMyTweetSettings,
  setShowForeignTweetSettings
}: Props) => {
  const onOutsideClick = useCallback((e: MouseEvent) => {
    e.stopImmediatePropagation();

    if (showForeignTweetSettings) setShowForeignTweetSettings(false);
    else setShowMyTweetSettings(false);
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutsideClick);

    return () => {
      document.removeEventListener('click', onOutsideClick);
    }
  }, []);

  return (
    <div 
      className="absolute bg-[black] top-0 right-0 rounded-lg w-64 z-20 cursor-pointer" 
      style={{ boxShadow: "0 0 12px rgba(175, 175, 175, 0.5)" }}
      id="settings_options"
    >
      { showMyTweetSettings && 
        <DeleteOption setWarningModal={setWarningModal}/> 
      }
      { showForeignTweetSettings &&
        <ConnectionActionOption 
          tweet={tweet}
        />
      }
    </div>
  )
}

export default TweetSettingsOptions;