import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});