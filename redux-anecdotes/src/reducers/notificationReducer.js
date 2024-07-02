import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return '';
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, displayTime) => {
  return async (dispatch) => {
    dispatch(displayNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, displayTime * 1000);
  };
};
export default notificationSlice.reducer;
