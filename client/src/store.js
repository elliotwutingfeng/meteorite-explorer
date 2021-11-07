import { configureStore } from "@reduxjs/toolkit";
// Thunk middleware allows us to write async logic that interacts with the Redux store
import thunk from "redux-thunk";

import dataBankReducer from "./dataBankSlice";
export const store = configureStore({
  reducer: {
    dataBank: dataBankReducer,
  },
  middleware: [thunk],
});
