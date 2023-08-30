'use client'

import PopUpMessage from "@/components/ui/errors/popUpMessage";
import SpinningLoader from "@/components/ui/loaders/spinningLoader";
import { GetFollower, GetFollowersResponse, getFollowers } from "@/services/user.service";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Follower from "./follower";

const FETCH_FOLLOWERS_TAKE = 50;

type Props = { 
  session: Session;
  fetchedFollowersResponse: GetFollowersResponse; 
  targetUsername: string;
}

const FollowersList = ({ session, targetUsername, fetchedFollowersResponse }: Props) => {
  const [followers, setFollowers] = useState<Array<GetFollower>>(fetchedFollowersResponse.followers);
  const [apiError, setApiError] = useState<null | string>(null);
  const [pageOffSet, setPageOffSet] = useState<number>(FETCH_FOLLOWERS_TAKE);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleFetchFollowers = async () => {
    try {
      const response = await getFollowers(session.accessToken, targetUsername, pageOffSet, FETCH_FOLLOWERS_TAKE);

      setPageOffSet(prev => prev + FETCH_FOLLOWERS_TAKE);
      setFollowers(prev => [...prev, ...response.data.followers]);
      setHasMore(response.data.hasMore);
    } catch(err) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  return (
    <>
      {
        followers.length > 0 
          ? (
              <InfiniteScroll 
                dataLength={followers.length}
                next={handleFetchFollowers}
                hasMore={hasMore}
                loader={<SpinningLoader />}
              >
                {
                  followers.map(follower => {
                    return (
                      <Follower 
                        follower={follower}
                        key={follower.username}
                        session={session}
                      />
                    )
                  })
                }
              </InfiniteScroll>
            )
          :
          <div>No Followers Yet</div>
      }

      { apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>}
    </>
  )
}

export default FollowersList;