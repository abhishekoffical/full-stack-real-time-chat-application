import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
  messages: [],
  users: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.messages = [];
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearChat: (state) => {
      state.selectedUser = null;
      state.messages = [];
    },
  },
});

export const {
  setUsers,
  setSelectedUser,
  setMessages,
  addMessage,
  setLoading,
  setError,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;