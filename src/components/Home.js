import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Post from "./Post";

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { AuthContext } from "../helpers/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../features/postSlice";
import BASE from "../config/apiconfig";
function Home() {
  const [listOfPost, setListOfPost] = useState([]);
  //const { authState, setAuthState } = useContext(AuthContext);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios.get("http://localhost:3002/post").then((res) => {
  //     console.log("res===>", res);
  //     setListOfPost(res.data.post);
  //   });
  // }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE.API_DEPLOYED_BASE_URL}/post`);
        dispatch(setPosts(response.data.post));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);
  const likedPost = (id) => {
    axios
      .post(
        `${BASE.API_DEPLOYED_BASE_URL}/likes`,
        {
          postId: id,
          username: authState?.username,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {});
  };
  return (
    <div className="post-list-container">
      {posts?.map((val, key) => (
        <Post
          post={val}
          authState={authState.isAuthenticated}
          likedPost={likedPost}
        />
      ))}
    </div>
  );
}

export default Home;
