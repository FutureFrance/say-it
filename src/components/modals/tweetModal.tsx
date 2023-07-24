import { Dispatch } from "react";
import Modal from "./modal";
import UserThoughtsInput from "../user/userThoughtsInput";
import { Session } from "next-auth";

type IProps = { 
  setModalOn: Dispatch<boolean>, 
  session: Session; 
  inputId: string;
  modalOn: boolean;
  tweetParentId: number | null; 
  toReply?: boolean;
}

const TweetModal = ({ setModalOn, session, inputId, modalOn, toReply = false, tweetParentId = null }: IProps) => {
  return (
    <Modal setModalOn={setModalOn}> 
      <div 
        className={`modal_container bg-[black] rounded-[30px] p-2 w-[100%] h-[100%] sm:max-w-[400px] sm:max-h-[400px]`} //
        onClick={(e) => e.stopPropagation()}
      >
        <UserThoughtsInput 
          session={session} 
          inputId={inputId} 
          tweetParentId={tweetParentId} 
          toReply={toReply} 
          setModalOn={setModalOn}
        />
      </div>
    </Modal>
  )
}

export default TweetModal;