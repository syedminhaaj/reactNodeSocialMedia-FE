import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  searchQuery: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    updateLikeCount: (state, action) => {
      const { postId, likeCount, likedUsers } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likeCount = likeCount;
        state.posts[postIndex].likedByUsers = likedUsers;
      }
    },
  },
});

export const { setPosts, updateLikeCount, setSearchQuery } = postSlice.actions;

export default postSlice.reducer;
