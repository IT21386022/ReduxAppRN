import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/CounterSlies";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
