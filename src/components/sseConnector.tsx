import { Session } from "next-auth";
import { useEffect } from "react";

const SseConnector = ({ session }: { session: Session }) => {
  useEffect(() => {
    document.cookie = `auth=${session.accessToken}; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
    const eventSource = new EventSource('http://localhost:7777/api/sse',{
      withCredentials: true
    });

    eventSource.onerror = (event) => {
      console.log(event);
    }

    eventSource.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        console.log(eventData);
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
