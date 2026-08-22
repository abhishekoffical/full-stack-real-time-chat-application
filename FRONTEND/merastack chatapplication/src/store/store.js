import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices.js";
import chatReducer from "./slices/ChatSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
