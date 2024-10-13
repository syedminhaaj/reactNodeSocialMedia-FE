import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import PostCommentInput from "./PostCommentInput";

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
function Home() {
  const [listOfPost, setListOfPost] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
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
        const response = await axios.get("http://localhost:3002/post");
        dispatch(setPosts(response.data.post));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [dispatch]);
  const likedPost = (id) => {
    console.log("authState?.username, ", authState?.username);
    axios
      .post(
        "http://localhost:3002/likes",
        {
          postId: id,
          username: authState?.username,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log("after you like ******", res);
      });
  };
  return (
    <div className="post-list-container">
      {posts?.map((val, key) => (
        <Card key={key} className="post-card">
          <CardHeader
            title={val.title}
            className="post-card-header"
            titleTypographyProps={{ variant: "h5" }}
          />
          <CardContent>
            <Typography variant="body2" className="post-text">
              {val.postText}
            </Typography>
          </CardContent>
          <div className="post-card-footer">
            {/* Tooltip around Like button */}
            <Tooltip
              title={val.likedByUsers?.split(",").join(", ") || "No likes yet"} // Show the list of users or default text
              arrow
              placement="top"
            >
              <Button
                startIcon={<ThumbUpIcon />}
                size="medium"
                className="action-btn"
                onClick={() => likedPost(val.id)}
              >
                Like ({val.likeCount}) {/* Display like count */}
              </Button>
            </Tooltip>

            <Button
              startIcon={<CommentIcon />}
              size="medium"
              className="action-btn"
            ></Button>
            <Typography variant="body2" className="username">
              {val.username}
            </Typography>
          </div>
          <Box className="comment-box">
            <PostCommentInput postId={val.id} />
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default Home;
