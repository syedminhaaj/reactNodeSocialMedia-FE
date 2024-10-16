import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    updateLikeCount: (state, action) => {
      const { postId, likeCount } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likeCount = likeCount;
      }
    },
  },
});

export const { setPosts, updateLikeCount } = postSlice.actions;

export default postSlice.reducer;
