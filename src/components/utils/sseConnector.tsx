'use client'

import { incrementLikesCount, incrementRepliesCount, incrementViewsCount } from "@/redux/features/tweetStatisticsSlice";
import { incrementNotificationsCount } from "@/redux/features/userNotificationsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { NotificationTypes } from "@/types/notification.interface";
import { Session } from "next-auth";
import { useEffect } from "react";

const SseConnector = ({ session }: { session: Session }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.cookie = `auth=${session.accessToken}; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/notifications/sse`,{ 
      withCredentials: true
    });
    console.log("connection established", eventSource)
    eventSource.onerror = (event) => {
      console.log("EVENT ERROR", event);
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === NotificationTypes.REPLY) dispatch(incrementRepliesCount({ tweetId: data.tweetId }));
        else if (data.event === NotificationTypes.LIKE) dispatch(incrementLikesCount({ tweetId: data.tweetId }));
        else if (data.event === NotificationTypes.VIEW) {
          return dispatch(incrementViewsCount({ tweetId: data.tweetId }));
        }

        dispatch(incrementNotificationsCount());
      } catch(err) {
        console.log(err);
      }
    }

    return () => {
      eventSource.close();
    }
  }, []);

  return <></>
}

export default SseConnector;
