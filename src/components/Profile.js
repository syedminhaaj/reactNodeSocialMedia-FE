import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Post from "./Post";
import axios from "axios";
import BASE from "../config/apiconfig";
import { useDispatch } from "react-redux";
import { updateLikeCount } from "../features/postSlice";
const Profile = () => {
  const { username } = useParams();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const usernameCheck =
    (username != undefined && username) || authState.username;
  const postList = useSelector((state) =>
    state.posts.posts.filter((item) => item.username === username)
  );
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
      <h3>{usernameCheck} - Profile</h3>
      {postList.length > 0 ? (
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
  );
};

export default Profile;
