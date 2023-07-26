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
        className={`modal_container bg-[black] rounded-[30px] p-2 min-w-[600px] h-[100%] sm:max-h-[300px] pb-2`} //
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