import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";
import { auth, db, storage } from "../config/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CreatePost() {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigate();

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

          <button type="submit" className="btn btn-primary ms-5">
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
