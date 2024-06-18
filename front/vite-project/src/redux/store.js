import { configureStore } from "@reduxjs/toolkit";
import gymReducer from "./slice";

export const store = configureStore({
  reducer: {
    gym: gymReducer,
  },
});
