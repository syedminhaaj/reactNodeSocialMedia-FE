import React, { useState } from "react";

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
import { Link } from "react-router-dom";
import PostCommentInput from "./PostCommentInput";
import axios from "axios";
import BASE from "../config/apiconfig";

import { useParams } from "react-router-dom";
function Post({ post, authState, likedPost }) {
  const { id } = useParams();
  axios.get(`${BASE.API_DEPLOYED_BASE_URL}/post/byId/${id}`);

  return (
    <div>
      <Card className="post-card">
        <CardHeader
          title={post.title}
          className="post-card-header"
          titleTypographyProps={{ variant: "h5" }}
        />
        <CardContent>
          <Typography variant="body2" className="post-text">
            {post.postText}
          </Typography>
        </CardContent>
        <div className="post-card-footer">
          <Tooltip
            title={post.likedByUsers?.split(",").join(", ") || "No likes yet"}
            arrow
            placement="top"
          >
            <Button
              startIcon={<ThumbUpIcon />}
              size="medium"
              className="action-btn"
              onClick={() => likedPost(post.id)}
            >
              Like ({post.likeCount})
            </Button>
          </Tooltip>

          <Button
            startIcon={<CommentIcon />}
            size="medium"
            className="action-btn"
          ></Button>
          <Typography variant="body2" className="username">
            <Link to={`/profile/${post.username}`}>{post.username}</Link>
          </Typography>
        </div>
        <Box className="comment-box">
          <PostCommentInput postId={post.id} />
        </Box>
      </Card>
    </div>
  );
}

export default Post;
