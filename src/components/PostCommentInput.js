import React, { useState, useContext } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../helpers/AuthContext";
import "./main.css";

export default function PostCommentInput(props) {
  const postId = props.postId;
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);

  const getComments = async () => {
    if (!showComments) {
      const url = `http://localhost:3002/comment/getId/${postId}`;
      await axios.get(url).then((res) => {
        setAllComments(res.data.comments);
      });
    }
    setShowComments((prev) => !prev);
  };

  const handleDeleteComment = async (id) => {
    await axios
      .delete(`http://localhost:3002/comment/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log("res aflter delete", res);
        setAllComments(
          allComments.filter((val) => {
            return val.id == id;
          })
        );
        setShowComments(false);
      });
  };

  const handleEditComment = async () => {};
  const handleSendComment = async () => {
    const commentData = {
      post_id: postId,
      comment_desc: comment,
    };

    try {
      await axios.post("http://localhost:3002/comment", commentData, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      });
      getComments();
    } catch (error) {
      console.error("Error submitting the comment:", error);
    }
    setComment("");
  };
  return (
    <div>
      {authState.status && (
        <>
          <div className="input-group mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSendComment}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </>
      )}

      <button
        className="btn btn-primary mb-3"
        onClick={getComments}
        color="primary"
      >
        {showComments ? "Hide Comments" : "Load Comments"}
      </button>
      {showComments ? (
        <div>
          {allComments.length > 0 ? (
            allComments?.map((comment, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        <b>{comment.username}</b>
                      </h6>
                      <p className="card-text">{comment.comment_desc}</p>
                    </div>
                    <small className="text-muted">
                      {new Date(comment.created_at).toLocaleString()}
                    </small>
                  </div>
                  {authState.username}-{comment.username} ={comment.comment_id}
                  {authState.username === comment.username && (
                    <div className="d-flex justify-content-end mt-2">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditComment(comment.comment_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.comment_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
