import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the post data
    const postData = {
      title: postTitle,
      postText: postText,
      username: username,
    };

    try {
      const response = await axios.post("http://localhost:3002/post", postData);
      setPostTitle("");
      setPostText("");
      navigation("/");
    } catch (error) {
      console.error("Error submitting the post:", error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="postText"
              className="form-label fw-bold d-flex justify-content-start"
            >
              Name
            </label>
            <input
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="postTitle"
              className="form-label fw-bold d-flex justify-content-start"
            >
              Post Title
            </label>
            <input
              type="text"
              className="form-control"
              id="postTitle"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Enter your post title"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="postText"
              className="form-label fw-bold d-flex justify-content-start"
            >
              Post Text
            </label>
            <textarea
              className="form-control"
              id="postText"
              rows="4"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Write your post content here"
              autoComplete="off"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              navigation("/");
            }}
            className="btn btn-danger ms-5"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
