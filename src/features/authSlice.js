import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    username: null,
    accessToken: localStorage.getItem("accessToken"),
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.accessToken = action.payload.token;
      localStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;