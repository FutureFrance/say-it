import { Dispatch } from "react";
import Modal from "../modal";
import UserThoughtsInput from "../userThoughtsInput";
import { Session } from "next-auth";

const TweetModal = ({ setModalOn, session }: { setModalOn: Dispatch<boolean>, session: Session }) => {
  return (
    <Modal setModalOn={setModalOn}> 
      <div 
        className="modal_container bg-[black] w-[35%] h-[35%] rounded-[30px]" //sm:w-[100%]
        onClick={(e) => e.stopPropagation()}
      >
        <UserThoughtsInput session={session} inputId="appMenu_file_input"/>
      </div>
    </Modal>
  )
}

export default TweetModal;