import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { postId, commentsArray } = action.payload;
      return {
        ...state,
        [postId]: commentsArray,
      };
    },
  },
});

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
