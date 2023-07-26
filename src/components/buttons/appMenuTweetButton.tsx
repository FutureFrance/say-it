'use client'

import { Session } from "next-auth"
import TweetButton from "./tweetButton";
import TweetModal from "../modals/tweetModal";
import { useState } from "react";

const AppMenuTweetButton = ({ session }: { session: Session}) => {
  const [modalOn, setModalOn] = useState<boolean>(false);

  return (
    <>
      { modalOn && <TweetModal setModalOn={setModalOn} modalOn={modalOn} session={session} inputId="appMenu_file_input" tweetParentId={null}/> }
      <TweetButton onClickAction={() => setModalOn(true) } styles="mt-4 p-0"/>
    </>
  )
}

export default AppMenuTweetButton;