import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  progress: false,
  error: false,
  success: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateStatus: (state, { payload }) => {
      state.progress = payload.progress;
      state.success = payload.success;
      state.error = payload.error;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setUser, updateStatus } = actions;
export default reducer;
