'use client'

import { useAppSelector } from "@/redux/hooks";
import { persistor } from "@/redux/store";
import { useEffect } from "react";

const clearPersistedData = () => {
  console.log("PURGED REDUX")
  persistor.purge(); 

};

const PersistanceFlushHandler = () => {
  useEffect(() => {
    window.addEventListener('beforeunload', clearPersistedData); 

    return () => {
      window.removeEventListener('beforeunload', () => '')
    }
  }, [])

  return <></>
}

export default PersistanceFlushHandler;
