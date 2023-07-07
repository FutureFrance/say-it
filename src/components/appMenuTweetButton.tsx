'use client'

import { Session } from "next-auth"
import TweetButton from "./buttons/tweetButton";
import TweetModal from "./modals/tweetModal";
import { useState } from "react";

const AppMenuTweetButton = ({ session }: { session: Session}) => {
  const [modalOn, setModalOn] = useState<boolean>(false);

  return (
    <>
      { modalOn && <TweetModal setModalOn={setModalOn} session={session} inputId="appMenu_file_input" tweetParentId={null}/> }
      <TweetButton onClickAction={() => setModalOn(true) }/>
    </>
  )
}

export default AppMenuTweetButton;