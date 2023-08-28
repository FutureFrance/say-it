'use client'

import { persistor } from "@/redux/store";
import { useEffect } from "react";

const clearPersistedData = () => {
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
