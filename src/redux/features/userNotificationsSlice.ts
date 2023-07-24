import { createSlice } from "@reduxjs/toolkit";

const userNotificationSlice = createSlice({
  name: 'notifications_count',
  initialState: { notificationsCount: 0},
  reducers: {
    incrementNotificationsCount: (state) => {
      state.notificationsCount += 1;
    }
  }
});

export const { incrementNotificationsCount } = userNotificationSlice.actions;

export default userNotificationSlice.reducer;