'use client'

import { persistor } from "@/redux/store";
import { useCallback, useEffect } from "react";


const PersistanceFlushHandler = () => {
  const clearPersistedData = () => {
    persistor.purge(); 
  };
  
  const memoizedCleaner = useCallback(clearPersistedData, []);

  useEffect(() => {
    window.addEventListener('beforeunload', memoizedCleaner); 

    return () => {
      window.removeEventListener('beforeunload', memoizedCleaner);
    }
  }, []);

  return <></>
}

export default PersistanceFlushHandler;
