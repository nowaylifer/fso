import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  message: '',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.isShown = true;
      state.message = action.payload;
    },
    hideNotification(state) {
      state.isShown = false;
      state.message = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
