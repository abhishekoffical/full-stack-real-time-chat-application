import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-toastify";
import { connectSocket, disconnectSocket } from "../../lib/socket.js";

export const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/me");
    connectSocket( res.data.user._id);
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("/user/sign-up", data);
    connectSocket(response.data._id)
    toast.success("Account created successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const login = createAsyncThunk(
  "user/sign-in",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/sign-in", data);

      console.log("🔥 LOGIN RESPONSE:", response.data);

      toast.success("Logged in successfully");

      // Login ke baad current user fetch karo
      const userResponse = await axiosInstance.get("/user/me");

      connectSocket(userResponse.data.user._id);

      return userResponse.data.user;

    } catch (error) {
      console.log("🔥 LOGIN ERROR:", error.response?.data);

      toast.error(error.response?.data?.message);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);
export const logout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
  try {
    await axiosInstance.get("/user/sign-out");
    disconnectSocket();
    return null;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/user/update-profile", data);
      toast.success("Profile updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUser
      .addCase(getUser.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      // signUp
      .addCase(signUp.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.isSigningUp = false;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
     .addCase(login.fulfilled, (state, action) => {
  state.authUser = action.payload;
  state.isLoggingIn = false;

      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authUser = state.authUser;
      })
      // updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
