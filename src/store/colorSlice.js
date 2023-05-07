import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: { colorState: "#ffffff" },
  reducers: {
    colorUpdate: (state, actions) => {
      state.colorState = actions.payload;
    },
  },
});

export default colorSlice;
export const { colorUpdate } = colorSlice.actions;
