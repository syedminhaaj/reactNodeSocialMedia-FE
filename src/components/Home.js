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
import { setPosts, updateLikeCount } from "../features/postSlice";
import DailogPopup from "./DailogPopup";

import BASE from "../config/apiconfig";
function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listOfPost, setListOfPost] = useState([]);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE.API_DEPLOYED_BASE_URL}/post`);
        await dispatch(setPosts(response.data.post));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const showPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const likedPost = (id) => {
    if (authState.username !== "" && authState.username !== null) {
      axios
        .post(
          `${BASE.API_DEPLOYED_BASE_URL}/likes`,
          {
            postId: id,
            username: authState?.username,
          },
          {
            headers: {
              AccessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          dispatch(
            updateLikeCount({ postId: id, likeCount: res.data.totalLikeCount })
          );
        });
    } else {
      showPopup();
    }
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
      {isPopupOpen && (
        <DailogPopup
          message="In order to like, You must Log in"
          link="/login"
          buttonText="Redirect to Login"
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default Home;
