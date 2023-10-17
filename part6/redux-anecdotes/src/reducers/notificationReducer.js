import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  message: '',
  time: 5,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state.isShown = true;
      state.message = action.payload.message;
      state.time = action.payload.time ?? initialState.time;
    },
    hideNotification(state) {
      state.isShown = false;
      state.message = '';
    },
  },
});

export const notify = (message, time) => {
  return (dispatch) => {
    dispatch(showNotification({ message, time }));
  };
};
export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
