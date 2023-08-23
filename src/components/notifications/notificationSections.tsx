'use client'

import { useState } from "react";
import PopUpMessage from "../ui/errors/popUpMessage";
import Notification from "./notification";
import NoDataInfo from "../ui/informative/noDataInfo";
import InfiniteScroll from "react-infinite-scroll-component";
import { AxiosError } from "axios";
import SpinningLoader from "../ui/loaders/spinningLoader";
import { Session } from "next-auth";
import { INotification } from "@/types/notification.interface";
import { getUserNotifications } from "@/services/user.service";
import { FETCH_NOTIFICATIONS_TAKE } from "@/constants/tweets/notification.constants";

type Props = { 
  session: Session;
  fetchedUserNotifications: Array<INotification>;
}

const NotificationsSection = ({ session, fetchedUserNotifications }: Props) => {
  const [notifications, setNotifications] = useState<Array<INotification>>(fetchedUserNotifications);
  const [pageOffSet, setPageOffSet] = useState<number>(FETCH_NOTIFICATIONS_TAKE);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  // set in redux the notifs to zero ???
  const handlefFetchUserNotifications = async () => {   
    try {
      const response = await getUserNotifications(session.accessToken, pageOffSet, FETCH_NOTIFICATIONS_TAKE);

      setNotifications(prev => [...prev, ...response.data.notifications]);
      setPageOffSet(prev => prev + FETCH_NOTIFICATIONS_TAKE);
      setHasMore(response.data.hasMore);

      return [...notifications, ...response.data.notifications];
    }catch (err: any) {
      if (err instanceof AxiosError) setApiError(err.response?.data.message)
    }
  } 

  return ( 
    <div className={`${notifications.length === 0 ? 'flex items-center justify-center h-[100vh]' : ''}`}>
      {notifications.length > 0 ?
        (
          <InfiniteScroll 
            dataLength={notifications.length}
            next={handlefFetchUserNotifications}
            hasMore={hasMore}
            loader={<SpinningLoader />}
          >
          {
            notifications.map(notification => {
              return (
                <div key={notification.id} className="tweet_section hover:bg-hover_tweet_gray"> 
                  <div className="border w-[100%] border-zinc-800 mb-2"></div>

                  <Notification  
                    session={session} 
                    notification={notification}
                  />
                </div>
              ) 
            })
          }
          </InfiniteScroll>
        )
        : <NoDataInfo text="Oops, Nothing yet to see here yet"/>
      }  

      { apiError && <PopUpMessage text={apiError} setText={setApiError} success={false} textColor="rose-400"/>}
    </div> 
  )
}

export default NotificationsSection;
