import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import authReducer from "../features/authSlice";
import commentReducer from "../features/commentSlice";
const store = configureStore({
  devTools: true,
  reducer: {
    posts: postReducer,
    auth: authReducer,
    comment: commentReducer,
  },
});

export default store;
