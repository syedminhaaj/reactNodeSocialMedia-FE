import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import axios from "axios";
import BASE from "../config/apiconfig";
import { useDispatch } from "react-redux";
import { updateLikeCount } from "../features/postSlice";
import { auth, db, storage } from "../config/firebase_config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./allStyles/Profile.css";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { username } = useParams();
  const authState = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [usernameInput, setUsernameInput] = useState(username || "");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const usernameCheck =
    (username !== undefined && username) || authState?.username;
  const postList = useSelector((state) =>
    state.posts.posts?.filter((item) => item.username === username)
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const updateProfile = async () => {
    setLoading(true);
    let imageUrl = null;
    if (image) {
      const storageRef = ref(storage, `profile_images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      try {
        await uploadTask;
        imageUrl = await getDownloadURL(storageRef);
        const response = await axios
          .put(`${BASE.API_DEPLOYED_BASE_URL}/profile`, {
            newUsername: usernameInput,
            email: authState.email,
            profilePicUrl: imageUrl,
          })
          .then((res) => {
            setLoading(false);
            return res;
          });
      } catch (error) {
        setLoading(false);
        console.error("Error uploading image:", error);
        setError("Failed to upload image. Please try again.");
        return;
      }
    }

    // Perform profile update logic here
    handleClose();
  };

  const likedPost = (id) => {
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
  };

  return (
    <div>
      <div className=" align-items-center">
        {loading && <Loader />}
        <h3>{usernameCheck} - Profile</h3>
        {authState?.username === username && (
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={handleOpen}
          />
        )}
      </div>
      <div className="post-list-container">
        {postList && postList.length > 0 ? (
          postList.map((val, key) => (
            <Post
              key={key}
              post={val}
              authState={authState.isAuthenticated}
              likedPost={likedPost}
            />
          ))
        ) : (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <div className="alert alert-primary">No posts yet</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for editing profile */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-popup">
          <Typography variant="h6" component="h2" mb={2}>
            Edit Profile
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </form>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={updateProfile}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
