import { createStore, combineReducers } from "redux";
import authReducer from "../features/reducer/authReducer";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducer = combineReducers({
//   auth: authReducer,
// });

// const store = createStore(rootReducer);

// export default store;

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
