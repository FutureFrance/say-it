import { Dispatch } from "react";
import Modal from "./modal";
import UserThoughtsInput from "../user/userThoughtsInput";
import { Session } from "next-auth";
import { ITweet } from "@/interfaces/tweets/tweet.interface";

type Props = { 
  setModalOn: Dispatch<boolean>, 
  session: Session; 
  inputId: string;
  modalOn: boolean;
  parentTweet: ITweet | null; 
  toReply?: boolean;
}

const TweetModal = ({ setModalOn, session, inputId, modalOn, toReply = false, parentTweet = null }: Props) => {
  return (
    <Modal setModalOn={setModalOn}> 
      <div 
        className={`bg-[black] rounded-[30px] p-4 sm:w-[700px] min-h-[200px]`} 
        onClick={(e) => e.stopPropagation()}
      >
        <UserThoughtsInput 
          session={session} 
          inputId={inputId} 
          parentTweet={parentTweet} 
          toReply={toReply} 
          setModalOn={setModalOn}
        />
      </div>
    </Modal>
  )
}

export default TweetModal;