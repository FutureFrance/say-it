'use client'

import PopUpMessage from "@/components/ui/errors/popUpMessage";
import SpinningLoader from "@/components/ui/loaders/spinningLoader";
import { GetConnection, getFollowers, getFollowings } from "@/services/user.service";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Connection from "./connection";
import { CONNECTIONS_TYPE } from "@/constants/connections";

const FETCH_CONNECTION_TAKE = 50;

type Props = { 
  session: Session;
  fetchedConnections: Array<GetConnection>; 
  targetUsername: string;
  connectionType: CONNECTIONS_TYPE;
  hasToFetchMore: boolean;
}

const ConnectionsList = ({ session, targetUsername, fetchedConnections, connectionType, hasToFetchMore }: Props) => {
  const [connections, setConnections] = useState<Array<GetConnection>>(fetchedConnections);
  const [apiError, setApiError] = useState<null | string>(null);
  const [pageOffSet, setPageOffSet] = useState<number>(FETCH_CONNECTION_TAKE);
  const [hasMore, setHasMore] = useState<boolean>(hasToFetchMore);

  const handleConnections = async () => {
    try {
      const response = connectionType === CONNECTIONS_TYPE.FOLLOWERS
        ? await getFollowers(session.accessToken, targetUsername, pageOffSet, FETCH_CONNECTION_TAKE)
        : await getFollowings(session.accessToken, targetUsername);

      setPageOffSet(prev => prev + FETCH_CONNECTION_TAKE);
      setConnections(prev => [...prev, ...response.data[connectionType]]);
      setHasMore(response.data.hasMore);

      return [...connections, ...response.data[connectionType]];
    } catch(err) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message);
    }
  }

  return (
    <>
      {
        connections.length > 0 
          ? (
              <InfiniteScroll 
                dataLength={connections.length}
                next={handleConnections}
                hasMore={hasMore}
                loader={<SpinningLoader />}
              >
                {
                  connections.map(connection => {
                    return (
                      <Connection 
                        connection={connection}
                        key={connection.username}
                        session={session}
                      />
                    )
                  })
                }
              </InfiniteScroll>
            )
          :
          <div className="flex justify-center mt-28 font-bold text-xl"><p> Nothing here yet :/ </p></div>
      }

      { apiError && <PopUpMessage text={apiError} setText={setApiError} />}
    </>
  )
}

export default ConnectionsList;