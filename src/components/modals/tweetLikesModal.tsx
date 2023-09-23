'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./modal";
import { ILike, getTweetLikes } from "@/services/likes.service";
import { Session } from "next-auth";
import InfiniteScroll from "react-infinite-scroll-component";
import SpinningLoader from "../ui/loaders/spinningLoader";
import Connection from "../user/connections/connection";

type Props = {
  setModal: Dispatch<SetStateAction<boolean>>;
  session: Session;
  tweetId: number;
}

const TweetLikesModal = ({ setModal, session, tweetId }: Props) => {
  const [likes, setLikes] = useState<Array<ILike>>([]);
  const [hasMore, setHasMore] = useState(false); 
  const [showSpinner, setShowSpinner] = useState(true);

  const fetchLikes = async () => {
    try {
      const response = await getTweetLikes(session.accessToken, tweetId);

      setHasMore(response.data.hasMore);
      setLikes(response.data.likes);
      setShowSpinner(false);
    } catch(err) {
      console.log(err);
      setShowSpinner(false);
    }
  }

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <Modal setModalOn={setModal}>
      <div className="bg-[#000000] h-[500px] w-[600px] rounded-xl pt-4" onClick={e => e.stopPropagation()}>
        <div className="ml-[12px] flex items-center">
          <img className="w-[14px] h-[14px] cursor-pointer" onClick={() => setModal(false)} src="/assets/x_icon.png" alt="" />
          <span className="ml-4 font-bold text-md">Liked By</span>
        </div>

        <div className="border w-[100%] border-zinc-800 mt-2"></div>
       
        { showSpinner ? (
          <div className="flex items-center justify-center h-[90%]">
            <SpinningLoader size={'[24px]'}/> 
          </div>
        ) : (
          (likes.length > 0 
            ? (
              <InfiniteScroll
                dataLength={likes.length}
                next={fetchLikes}
                hasMore={hasMore}
                loader={<SpinningLoader />}
              >
                {likes.map((like) => (
                  <Connection
                    connection={like.user}
                    key={like.user.username}
                    session={session}
                  />
                ))}
              </InfiniteScroll>
            )
            : (
              <div className="pt-12 flex justify-center">
                <div className="flex flex-col w-[300px] break-words">
                  <span className="text-2xl font-bold mb-2 text-center">Tweet has no likes : /</span>
                </div>
              </div>
            )
          )
        )}
      </div>
    </Modal>
  )
}

export default TweetLikesModal;