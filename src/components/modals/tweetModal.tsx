import { Dispatch } from "react";
import Modal from "../modal";
import UserThoughtsInput from "../userThoughtsInput";
import { Session } from "next-auth";

type IProps = { 
  setModalOn: Dispatch<boolean>, 
  session: Session; 
  inputId: string;
  tweetParentId: number | null; 
  toReply?: boolean;
}

const TweetModal = ({ setModalOn, session, inputId, toReply = false, tweetParentId = null }: IProps) => {
  return (
    <Modal setModalOn={setModalOn}> 
      <div 
        className="modal_container bg-[black] w-[35%] h-[35%] rounded-[30px]" //sm:w-[100%]
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