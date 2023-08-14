import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const userNotificationSlice = createSlice({
  name: 'notifications_count',
  initialState: { notificationsCount: 0},
  reducers: {
    incrementNotificationsCount: (state) => {
      state.notificationsCount += 1;
    },
    setInitialNotificationsCount: (state, action: PayloadAction<{initState: number}>) => {
      state.notificationsCount = action.payload.initState;
    }
  }
});

export const { incrementNotificationsCount, setInitialNotificationsCount } = userNotificationSlice.actions;

export default userNotificationSlice.reducer;