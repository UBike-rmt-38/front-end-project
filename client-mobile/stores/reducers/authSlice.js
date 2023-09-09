import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: false,
    isRenting: false,
  },
  reducers: {
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setIsRenting: (state, action) => {
      state.isRenting = action.payload;
    },
  },
});

export const { setIsSignedIn, setIsRenting } = authSlice.actions;

export default authSlice.reducer;
