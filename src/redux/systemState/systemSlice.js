import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setModalShow: (state, action) => {
      state.modalShow = action.payload;
    },
  },
});

const { actions, reducer } = systemSlice;

export const { setModalShow } = actions;
export default reducer;
