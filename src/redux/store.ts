
import { configureStore } from "@reduxjs/toolkit";
import LikesReducer from './features/likesSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'sayitstorage',
  storage : storage
};

const persistedReducer = persistReducer(persistConfig, LikesReducer);

export const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;