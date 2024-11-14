import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      console.log(state, "==statestatestate==");
      const newArray = state.filter((r) => r._id !== action.payload);
      console.log(newArray, "==statestatestate==");

      return newArray;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
