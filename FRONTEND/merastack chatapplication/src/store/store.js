import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/slices/authSlices.js";
import chatReducer from "../store/slices/ChatSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;