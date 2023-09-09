import React, { Dispatch, SetStateAction } from "react";
import ActionWarningModal from "../modals/actionWarningModal";
import { WARNING_MODALS } from "@/constants/global.constants";

type Props = {
  setWarningModal: Dispatch<SetStateAction<boolean>>;
  warningModalType: WARNING_MODALS;
  handleDeleteTweet: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const TweetsSettingsWarningModals = ({ warningModalType, setWarningModal, handleDeleteTweet }: Props) => {
  return (
    (() => {
      switch (warningModalType) {
        case WARNING_MODALS.VIEW_TWEET_DELETE: {
          return (
            <ActionWarningModal
              setWarningModal={setWarningModal}
              mainWarningText="Delete post ?"
              warningText="This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results."
              actionText="Delete"
              onClickAction={handleDeleteTweet}
            />    
          );
        }
        case WARNING_MODALS.NONE:
          return <></>;
      }
    })()
  )
}

export default TweetsSettingsWarningModals;