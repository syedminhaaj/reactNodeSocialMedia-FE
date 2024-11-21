import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";
import Loader from "./Loader";
import { storage } from "../config/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        setError(null); // Clear any previous errors
      } else {
        setError("Please select a valid image file.");
        setImage(null); // Clear the file if it's not an image
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = null;
    if (image) {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images_test/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      try {
        // Wait for the upload to complete
        await uploadTask;
        // Get the image URL
        imageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
        return;
      }
    }

    const postData = {
      title: postTitle,
      postText: postText,
      username: username,
      postImageUrl: imageUrl,
    };

    try {
      const response = await axios.post(
        `${BASE.API_DEPLOYED_BASE_URL}/post`,
        postData
      );
      setPostTitle("");
      setPostText("");
      setLoading(false);
      navigation("/");
    } catch (error) {
      setLoading(false);
      console.error("Error submitting the post:", error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        {loading && <Loader />}
        <h2 className="mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="postText"
              className="form-label fw-bold d-flex justify-content-start"
            >
              Username
            </label>
            <input
              className="form-control f-disabled "
              id="username"
              value={username}
              readOnly
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
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Write your post content here"
              autoComplete="off"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="image"
              className="form-label fw-bold d-flex justify-content-start"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleChangeImage}
              className="form-control"
              required
            />
            {/* {image && <p>File selected: {image.name}</p>} */}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-25">
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              navigation("/");
            }}
            className="btn btn-danger ms-5 w-25"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
