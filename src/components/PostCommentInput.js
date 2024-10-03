import React, { useState } from "react";
import axios from "axios";
import "./main.css";
export default function PostCommentInput(props) {
  const postId = props.postId;
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [allComments, setAllComments] = useState([]);

  const getComments = () => {
    if (!showComments) {
      console.log("you've to get all Comments here ******");

      const url = `http://localhost:3002/comment/getId/${postId}`;
      axios.get(url).then((res) => {
        console.log("res", res);
      });
    }
    setShowComments((prev) => !prev);
  };
  const handleSendComment = () => {
    const commentData = {
      post_id: postId,
      comment_desc: comment,
      username: "test",
    };

    try {
      axios.post("http://localhost:3002/comment", commentData);
    } catch (error) {
      console.error("Error submitting the comment:", error);
    }
    setComment("");
  };
  return (
    <div>
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
      <button className="btn btn-primary" onClick={getComments} color="primary">
        {showComments ? "Hide Comments" : "Load Comments"}
      </button>
      {showComments ? <div>show comments here</div> : ""}
    </div>
  );
}
