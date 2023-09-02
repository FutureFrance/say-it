'use client'

import { configureStore } from "@reduxjs/toolkit";
import TweetStatisticsReducer from './features/tweetStatisticsSlice';
import UserNotificationsCountReducer from './features/userNotificationsSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from "./storage";

const persistConfig = {
  key: 'sayitstorage',
  storage : storage
};

const persistedReducer = persistReducer(persistConfig, TweetStatisticsReducer);

export const store = configureStore({
  reducer: { persistedReducer, UserNotificationsCountReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;