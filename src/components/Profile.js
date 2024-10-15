import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "./Post";
import axios from "axios";
import BASE from "../config/apiconfig";

const Profile = () => {
  const { username } = useParams();
  const authState = useSelector((state) => state.auth);
  const postList = useSelector((state) =>
    state.posts.posts.filter((item) => item.username === username)
  );
  console.log("authState", authState);
  console.log("postList****", postList);

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
    <div>
      <h3>{username} - Profile</h3>
      {postList?.map((val, key) => (
        <Post
          key={key}
          post={val}
          authState={authState.isAuthenticated}
          likedPost={likedPost}
        />
      ))}
    </div>
  );
};

export default Profile;
